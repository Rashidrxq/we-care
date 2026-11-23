import { demoDoctors, upcomingDays, visitTimestamp } from '../src/booking/demo'
import { DatabaseRequestError, DatabaseUnavailable, dbRequest } from './_lib/db'
import { reject, secureResponse, type ApiRequest, type ApiResponse } from './_lib/http'

type StoredSlot = { starts_at: string }
export default async function handler(request: ApiRequest, response: ApiResponse) {
  secureResponse(response)
  if (request.method !== 'GET') return reject(response, 405, 'METHOD_NOT_ALLOWED')
  const doctorId = request.query.doctorId
  const date = request.query.date
  if (typeof doctorId !== 'string' || typeof date !== 'string' ||
      !demoDoctors.some(doctor => doctor.id === doctorId) || !upcomingDays().includes(date))
    return reject(response, 400, 'INVALID_SLOT_QUERY')

  try {
    const from = new Date(date + 'T00:00:00+05:30')
    const until = new Date(from.getTime() + 24 * 60 * 60 * 1000)
    const params = new URLSearchParams({
      select: 'starts_at',
      doctor_id: 'eq.' + doctorId,
      status: 'eq.confirmed',
      starts_at: 'gte.' + from.toISOString(),
    })
    // Query within the current day using an additional starts_at upper bound.
    params.append('starts_at', 'lt.' + until.toISOString())
    const reserved = await dbRequest<StoredSlot[]>('wecare_demo_bookings?' + params)
    const doctor = demoDoctors.find(item => item.id === doctorId)!
    const slots: string[] = []
    for (let hour = doctor.startHour; hour < doctor.endHour; hour++) {
      for (const minute of ['00', '30']) {
        const time = String(hour).padStart(2, '0') + ':' + minute
        const timestamp = visitTimestamp(date, time)
        if (timestamp < Date.now() + 15 * 60_000) continue
        if (reserved.some(item => Date.parse(item.starts_at) === timestamp)) continue
        slots.push(time)
      }
    }
    return response.status(200).json({ ok: true, date, doctorId, slots, timezone: 'Asia/Kolkata' })
  } catch (error) {
    const status = error instanceof DatabaseUnavailable ? 503 :
      error instanceof DatabaseRequestError ? error.code : 502
    return reject(response, status, status === 503 ? 'BOOKING_DATABASE_NOT_CONFIGURED' : 'AVAILABILITY_UNAVAILABLE')
  }
}
