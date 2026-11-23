import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { demoDoctors, demoPatients, upcomingDays, visitTimestamp } from '../src/booking/demo'
import { DatabaseRequestError, DatabaseUnavailable, dbRequest } from './_lib/db'
import { isJsonPost, originPermitted, reject, secureResponse, type ApiRequest, type ApiResponse } from './_lib/http'

type NewBooking = { reference: string; starts_at: string; doctor_id: string; patient_id: string; status: string }
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  secureResponse(response)
  if (request.method !== 'POST' && request.method !== 'DELETE')
    return reject(response, 405, 'METHOD_NOT_ALLOWED')
  if (!isJsonPost(request)) return reject(response, 415, 'JSON_BODY_REQUIRED_OR_TOO_LARGE')
  if (!originPermitted(request)) return reject(response, 403, 'ORIGIN_NOT_ALLOWED')
  if (!isRecord(request.body)) return reject(response, 400, 'INVALID_REQUEST')

  try {
    if (request.method === 'POST') {
      const { doctorId, patientId, date, time } = request.body
      if (typeof doctorId !== 'string' || typeof patientId !== 'string' ||
          typeof date !== 'string' || typeof time !== 'string')
        return reject(response, 400, 'INVALID_FIELDS')
      const doctor = demoDoctors.find(item => item.id === doctorId)
      const patient = demoPatients.find(item => item.id === patientId)
      if (!doctor || !patient || !upcomingDays().includes(date) ||
          !/^(?:0[0-9]|1[0-9]|2[0-3]):(?:00|30)$/.test(time))
        return reject(response, 400, 'INVALID_APPOINTMENT')
      const [hour, minute] = time.split(':').map(Number)
      const start = visitTimestamp(date, time)
      if (hour < doctor.startHour || hour >= doctor.endHour ||
          (minute !== 0 && minute !== 30) || start < Date.now() + 15 * 60_000)
        return reject(response, 400, 'SLOT_CLOSED')

      const cancellationToken = randomBytes(32).toString('hex')
      const reference = 'WC-DEMO-' + randomUUID().slice(0, 10).toUpperCase()
      const rows = await dbRequest<NewBooking[]>('wecare_demo_bookings', {
        method: 'POST',
        body: {
          reference,
          doctor_id: doctorId,
          patient_id: patientId,
          starts_at: new Date(start).toISOString(),
          status: 'confirmed',
          cancellation_token_hash: hashToken(cancellationToken),
        },
      })
      return response.status(201).json({
        ok: true, booking: rows[0], cancellationToken,
        notice: 'FICTIONAL BOOKING ONLY — NO REAL PATIENT OR CLINIC APPOINTMENT',
      })
    }

    const { reference, cancellationToken } = request.body
    if (typeof reference !== 'string' || !/^WC-DEMO-[0-9A-F-]{10}$/.test(reference) ||
        typeof cancellationToken !== 'string' || !/^[a-f0-9]{64}$/.test(cancellationToken))
      return reject(response, 400, 'INVALID_CANCELLATION_REQUEST')
    const params = new URLSearchParams({
      reference: 'eq.' + reference,
      cancellation_token_hash: 'eq.' + hashToken(cancellationToken),
      status: 'eq.confirmed',
      select: 'reference,status',
    })
    const rows = await dbRequest<Array<{ reference: string; status: string }>>(
      'wecare_demo_bookings?' + params, { method: 'PATCH', body: { status: 'cancelled' } }
    )
    if (!rows.length) return reject(response, 404, 'BOOKING_NOT_FOUND_OR_ALREADY_CANCELLED')
    return response.status(200).json({ ok: true, reference, status: 'cancelled' })
  } catch (error) {
    const status = error instanceof DatabaseUnavailable ? 503 :
      error instanceof DatabaseRequestError ? error.code : 502
    return reject(response, status,
      status === 503 ? 'BOOKING_DATABASE_NOT_CONFIGURED' :
      status === 409 ? 'SLOT_UNAVAILABLE' : 'BOOKING_SERVICE_UNAVAILABLE')
  }
}
