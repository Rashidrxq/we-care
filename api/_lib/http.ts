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
  const raw = request.headers['content-type']
  const contentType = Array.isArray(raw) ? raw[0] : raw
  const lengthHeader = request.headers['content-length']
  const length = Number(Array.isArray(lengthHeader) ? lengthHeader[0] : lengthHeader || 0)
  return typeof contentType === 'string' && contentType.startsWith('application/json') &&
    Number.isFinite(length) && length <= 1500
}

export function originPermitted(request: ApiRequest): boolean {
  const originValue = request.headers.origin
  const origin = Array.isArray(originValue) ? originValue[0] : originValue
  if (!origin) return true
  const allowed = (process.env.WECARE_ALLOWED_ORIGINS || 'https://we-care-healthcare-six.vercel.app')
    .split(',').map(value => value.trim())
  return allowed.includes(origin)
}
