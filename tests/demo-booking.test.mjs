import test from 'node:test'
import assert from 'node:assert/strict'
import {
  availableSlots, bookDemo, demoDoctors, demoPatients, readDemoBookings,
  resetDemoBookings, todayInKerala, upcomingDays, updateDemoBooking,
  visitTimestamp,
} from '../src/booking/demo.ts'

const store = new Map()
globalThis.window = {
  localStorage: {
    getItem(key) { return store.has(key) ? store.get(key) : null },
    setItem(key, value) { store.set(key, String(value)) },
    removeItem(key) { store.delete(key) },
  },
  dispatchEvent() {},
}

test('date formatting is fixed to Asia/Kolkata', () => {
  assert.equal(todayInKerala(new Date('2026-11-23T23:30:00Z')), '2026-11-24')
  assert.equal(todayInKerala(new Date('2026-11-23T04:00:00Z')), '2026-11-23')
})

test('clinic days are a bounded 14-day window and exclude Sundays', () => {
  const days = upcomingDays('2026-11-23')
  assert.ok(days.length >= 11 && days.length <= 14)
  assert.ok(!days.includes('2026-11-29'))
  assert.ok(days.includes('2026-11-23'))
  assert.ok(days.includes('2026-11-28'))
})

test('all profiles use fictional identities and sample-only email addresses', () => {
  assert.equal(demoDoctors.length, 3)
  assert.equal(demoPatients.length, 3)
  assert.ok(demoPatients.every(p => p.email.endsWith('@example.com')))
})

test('booking prevents duplicate slots, and cancellation makes them available', () => {
  resetDemoBookings()
  const date = upcomingDays().find(day => day !== todayInKerala())
  assert.ok(date)
  const doctor = demoDoctors[0]
  const slot = availableSlots(doctor.id, date)[0]
  assert.ok(slot)
  assert.ok(visitTimestamp(date, slot) > Date.now())
  const first = bookDemo(doctor.id, demoPatients[0].id, date, slot)
  assert.ok(first.booking)
  assert.equal(first.booking.status, 'confirmed')
  assert.ok(!availableSlots(doctor.id, date).includes(slot))
  const duplicate = bookDemo(doctor.id, demoPatients[1].id, date, slot)
  assert.equal(duplicate.booking, undefined)
  assert.match(duplicate.error, /already/)
  assert.equal(updateDemoBooking(first.booking.id, 'cancelled'), true)
  assert.ok(availableSlots(doctor.id, date).includes(slot))
  assert.equal(updateDemoBooking(first.booking.id, 'cancelled'), false)
  resetDemoBookings()
})

test('invalid doctor and patient IDs cannot be booked', () => {
  const date = upcomingDays().find(day => day !== todayInKerala())
  assert.ok(date)
  assert.equal(bookDemo('bad', demoPatients[0].id, date, '09:00').booking, undefined)
  assert.equal(bookDemo(demoDoctors[0].id, 'bad', date, '09:00').booking, undefined)
})

test('corrupt local storage fails safely and seed records are read-only', () => {
  store.set('wecare.phase3.fictional-bookings.v1', '{bad json')
  assert.equal(readDemoBookings().length, 3)
  assert.equal(updateDemoBooking('SAMPLE-01', 'cancelled'), false)
  resetDemoBookings()
})
