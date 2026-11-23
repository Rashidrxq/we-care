// This server-only adapter uses a dedicated Supabase project's private service key.
// Never expose SUPABASE_SERVICE_ROLE_KEY to Vite (VITE_* variables are public).
export class DatabaseUnavailable extends Error {}
export class DatabaseRequestError extends Error {
  constructor(public readonly code: number, message: string) { super(message) }
}

export function bookingEnabled(): boolean {
  return process.env.WECARE_BOOKING_API_ENABLED === 'true' &&
    Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export async function dbRequest<T>(resource: string, options: {
  method?: 'GET' | 'POST' | 'PATCH'
  body?: unknown
  prefer?: string
} = {}): Promise<T> {
  if (!bookingEnabled()) throw new DatabaseUnavailable('BOOKING_DATABASE_NOT_CONFIGURED')
  const url = process.env.SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const headers: Record<string, string> = {
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: options.prefer || 'return=representation',
  }
  if (key.startsWith('eyJ')) headers.Authorization = 'Bearer ' + key
  const response = await fetch(url.replace(/\/$/, '') + '/rest/v1/' + resource, {
    method: options.method || 'GET', headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) {
    // Do not log database responses; they may contain sensitive details.
    if (response.status === 409) throw new DatabaseRequestError(409, 'SLOT_UNAVAILABLE')
    throw new DatabaseRequestError(response.status >= 500 ? 502 : 400, 'DATABASE_REQUEST_FAILED')
  }
  return (await response.json()) as T
}
