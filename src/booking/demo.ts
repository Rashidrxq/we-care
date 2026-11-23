// All patients and appointments in Phase 3 are fictional browser-only demo data.
// No real patient contact details should ever be entered or stored here.
export type DemoDoctor = { id: string; name: string; department: string; startHour: number; endHour: number }
export type DemoPatient = { id: string; name: string; email: string }
export type DemoBooking = {
  id: string
  doctorId: string
  patientId: string
  date: string
  time: string
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

export const demoDoctors: DemoDoctor[] = [
  { id: 'ananya', name: 'Dr. Ananya Nair', department: 'General Medicine', startHour: 9, endHour: 13 },
  { id: 'fathima', name: 'Dr. Fathima Rahman', department: 'Pediatric Care', startHour: 10, endHour: 14 },
  { id: 'meera', name: 'Dr. Meera Krishnan', department: 'Women’s Healthcare', startHour: 14, endHour: 18 },
]
export const demoPatients: DemoPatient[] = [
  { id: 'asha', name: 'Asha Nair (fictional)', email: 'asha@example.com' },
  { id: 'rahul', name: 'Rahul Menon (fictional)', email: 'rahul@example.com' },
  { id: 'sana', name: 'Sana Rahman (fictional)', email: 'sana@example.com' },
]

const STORAGE_KEY = 'wecare.phase3.fictional-bookings.v1'
export const DEMO_UPDATED = 'wecare:demo-updated'
const TIME_ZONE = 'Asia/Kolkata'

export function todayInKerala(now = new Date()): string {
  const date = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now)
  const part = (type: string) => date.find(item => item.type === type)?.value ?? ''
  return part('year') + '-' + part('month') + '-' + part('day')
}

export function dateInKerala(date: string): Date {
  return new Date(date + 'T12:00:00+05:30')
}

export function visitTimestamp(date: string, time: string): number {
  return Date.parse(date + 'T' + time + ':00+05:30')
}

export function upcomingDays(today = todayInKerala()): string[] {
  const start = dateInKerala(today)
  const results: string[] = []
  for (let offset = 0; offset < 14; offset++) {
    const candidate = new Date(start.getTime() + offset * 86_400_000)
    if (candidate.getUTCDay() === 0) continue
    const iso = candidate.toISOString().slice(0, 10)
    results.push(iso)
  }
  return results
}

function permittedSlot(doctorId: string, date: string, time: string, now = Date.now()): boolean {
  const doctor = demoDoctors.find(item => item.id === doctorId)
  if (!doctor || !upcomingDays().includes(date)) return false
  if (!/^(?:0[0-9]|1[0-9]|2[0-3]):(?:00|30)$/.test(time)) return false
  const [hour, minute] = time.split(':').map(Number)
  return hour >= doctor.startHour && hour < doctor.endHour &&
    (minute === 0 || minute === 30) && visitTimestamp(date, time) > now + 15 * 60_000
}

export function seedDemoBookings(): DemoBooking[] {
  const days = upcomingDays().filter(date => date !== todayInKerala())
  return demoDoctors.map((doctor, index) => ({
    id: 'SAMPLE-0' + (index + 1),
    doctorId: doctor.id,
    patientId: demoPatients[index].id,
    date: days[Math.min(index, days.length - 1)] ?? todayInKerala(),
    time: String(doctor.startHour + 1).padStart(2, '0') + ':00',
    status: 'confirmed',
    createdAt: 'DEMO SEED',
  }))
}

export function readDemoBookings(): DemoBooking[] {
  if (typeof window === 'undefined') return seedDemoBookings()
  let parsed: unknown = []
  try {
    parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    parsed = []
  }
  const entries = Array.isArray(parsed) ? parsed : []
  const valid = entries.filter((entry): entry is DemoBooking => (
    entry !== null && typeof entry === 'object' &&
    typeof entry.id === 'string' && typeof entry.date === 'string' &&
    typeof entry.time === 'string' && typeof entry.createdAt === 'string' &&
    demoDoctors.some(doctor => doctor.id === entry.doctorId) &&
    demoPatients.some(patient => patient.id === entry.patientId) &&
    ['confirmed', 'cancelled', 'completed'].includes(entry.status)
  ))
  return [...seedDemoBookings(), ...valid.slice(0, 100)]
}

function saveDemoBookings(items: DemoBooking[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new Event(DEMO_UPDATED))
    return true
  } catch {
    return false
  }
}

export function availableSlots(doctorId: string, date: string, bookings = readDemoBookings()): string[] {
  const doctor = demoDoctors.find(item => item.id === doctorId)
  if (!doctor || !upcomingDays().includes(date)) return []
  const slots: string[] = []
  for (let hour = doctor.startHour; hour < doctor.endHour; hour++) {
    for (const minute of ['00', '30']) {
      const time = String(hour).padStart(2, '0') + ':' + minute
      if (!permittedSlot(doctorId, date, time)) continue
      if (!bookings.some(item => item.doctorId === doctorId && item.date === date &&
        item.time === time && item.status === 'confirmed')) slots.push(time)
    }
  }
  return slots
}

export function bookDemo(doctorId: string, patientId: string, date: string, time: string):
  { booking?: DemoBooking; error?: string } {
  if (!demoPatients.some(patient => patient.id === patientId)) return { error: 'Select a fictional demo patient.' }
  if (!permittedSlot(doctorId, date, time)) return { error: 'This date or time is no longer available.' }
  const existing = readDemoBookings()
  if (!availableSlots(doctorId, date, existing).includes(time))
    return { error: 'That slot has already been reserved in this browser.' }
  const booking: DemoBooking = {
    id: 'WC-DEMO-' + crypto.randomUUID().slice(0, 8).toUpperCase(),
    doctorId, patientId, date, time, status: 'confirmed', createdAt: new Date().toISOString()
  }
  const custom = existing.filter(item => !item.id.startsWith('SAMPLE-'))
  if (!saveDemoBookings([...custom, booking])) return { error: 'Browser storage is unavailable, so no demo booking was saved.' }
  return { booking }
}

export function updateDemoBooking(id: string, status: 'cancelled' | 'completed'): boolean {
  const current = readDemoBookings().filter(item => !item.id.startsWith('SAMPLE-'))
  const target = current.find(item => item.id === id)
  if (!target || target.status !== 'confirmed') return false
  if (status === 'completed' && visitTimestamp(target.date, target.time) > Date.now()) return false
  const next = current.map(item => item.id === id ? { ...item, status } : item)
  return saveDemoBookings(next)
}

export function resetDemoBookings(): boolean {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event(DEMO_UPDATED))
    return true
  } catch {
    return false
  }
}

export function formatVisitDate(date: string): string {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', weekday: 'short',
    timeZone: TIME_ZONE }).format(dateInKerala(date))
}

export function displayTime(time: string): string {
  const [hour, minute] = time.split(':').map(Number)
  const twelveHour = hour % 12 || 12
  return twelveHour + ':' + String(minute).padStart(2, '0') + (hour >= 12 ? ' PM' : ' AM')
}
