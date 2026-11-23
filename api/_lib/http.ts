import { timingSafeEqual } from 'node:crypto'

export type ApiRequest = {
  method?: string
  query: Record<string, string | string[] | undefined>
  headers: Record<string, string | string[] | undefined>
  body?: unknown
}
export type ApiResponse = {
  setHeader(name: string, value: string): void
  status(code: number): ApiResponse
  json(value: unknown): void
}

export function secureResponse(response: ApiResponse): void {
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
}

export function reject(response: ApiResponse, status: number, error: string): void {
  response.status(status).json({ ok: false, error })
}

export function isJsonPost(request: ApiRequest): boolean {
  const rawType = request.headers['content-type']
  const contentType = (Array.isArray(rawType) ? rawType[0] : rawType)?.split(';')[0]?.trim().toLowerCase()
  const lengthHeader = request.headers['content-length']
  const rawLength = Array.isArray(lengthHeader) ? lengthHeader[0] : lengthHeader
  const declared = rawLength === undefined ? null : Number(rawLength)
  // The request body has already been parsed by Vercel. Check its actual
  // serialised size even when Content-Length is missing or incorrect.
  let actualLength: number
  try {
    actualLength = Buffer.byteLength(JSON.stringify(request.body ?? null), 'utf8')
  } catch {
    return false
  }
  return contentType === 'application/json' &&
    (declared === null || (Number.isInteger(declared) && declared >= 0 && declared <= 1500)) &&
    actualLength <= 1500
}

export function originPermitted(request: ApiRequest): boolean {
  const originValue = request.headers.origin
  const origin = Array.isArray(originValue) ? originValue[0] : originValue
  if (!origin) return true // Server-to-server clients authenticate separately.
  const allowed = (process.env.WECARE_ALLOWED_ORIGINS || 'https://we-care-healthcare-six.vercel.app')
    .split(',').map(value => value.trim()).filter(Boolean)
  return allowed.includes(origin)
}

export function serverDemoKeyConfigured(): boolean {
  return typeof process.env.WECARE_DEMO_SERVER_API_KEY === 'string' &&
    Buffer.byteLength(process.env.WECARE_DEMO_SERVER_API_KEY, 'utf8') >= 32
}

// This key is ONLY for server-to-server fictional-data integration testing.
// Do not put it in the Vite app or a localStorage-backed staff dashboard.
export function validServerDemoKey(request: ApiRequest): boolean {
  if (!serverDemoKeyConfigured()) return false
  const value = request.headers.authorization
  const header = Array.isArray(value) ? value[0] : value
  if (!header?.startsWith('Bearer ')) return false
  const supplied = Buffer.from(header.slice(7), 'utf8')
  const expected = Buffer.from(process.env.WECARE_DEMO_SERVER_API_KEY!, 'utf8')
  if (supplied.length !== expected.length) return false
  return timingSafeEqual(supplied, expected)
}

export function appointmentDayFilter(date: string): URLSearchParams {
  // Supabase PostgREST uses an 'and' filter for two limits on one column.
  // Do not repeat starts_at= twice in a URLSearchParams object.
  const from = new Date(date + 'T00:00:00+05:30')
  const until = new Date(from.getTime() + 24 * 60 * 60 * 1000)
  return new URLSearchParams({
    select: 'starts_at',
    and: '(starts_at.gte.' + from.toISOString() +
      ',starts_at.lt.' + until.toISOString() + ')',
  })
}
