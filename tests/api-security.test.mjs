import test from 'node:test'
import assert from 'node:assert/strict'
import {
  appointmentDayFilter, isJsonPost, originPermitted,
  serverDemoKeyConfigured, validServerDemoKey
} from '../api/_lib/http.ts'
import { bookingEnabled, DatabaseUnavailable, dbRequest } from '../api/_lib/db.ts'

const req = (headers = {}, body = {}) => ({
  method: 'POST', query: {}, headers, body
})

test('booking service stays disabled without its database credentials', async () => {
  const previous = {
    enabled: process.env.WECARE_BOOKING_API_ENABLED,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY
  }
  delete process.env.WECARE_BOOKING_API_ENABLED
  delete process.env.SUPABASE_URL
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
  try {
    assert.equal(bookingEnabled(), false)
    await assert.rejects(() => dbRequest('wecare_demo_bookings'), DatabaseUnavailable)
  } finally {
    for (const [key, value] of Object.entries({
      WECARE_BOOKING_API_ENABLED: previous.enabled,
      SUPABASE_URL: previous.url,
      SUPABASE_SERVICE_ROLE_KEY: previous.key
    })) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  }
})

test('HTTP content type and payload size are strictly checked', () => {
  assert.equal(isJsonPost(req({ 'content-type': 'application/json; charset=utf-8' }, { example: true })), true)
  assert.equal(isJsonPost(req({ 'content-type': 'application/jsonp' }, { example: true })), false)
  assert.equal(isJsonPost(req({ 'content-type': 'application/json' }, { large: 'a'.repeat(1550) })), false)
  assert.equal(isJsonPost(req({ 'content-type': 'application/json', 'content-length': '1600' }, {})), false)
  assert.equal(isJsonPost(req({ 'content-type': 'application/json', 'content-length': 'invalid' }, {})), false)
})

test('private integration key is required and comparison handles invalid tokens', () => {
  const previous = process.env.WECARE_DEMO_SERVER_API_KEY
  delete process.env.WECARE_DEMO_SERVER_API_KEY
  try {
    assert.equal(serverDemoKeyConfigured(), false)
    assert.equal(validServerDemoKey(req({ authorization: 'Bearer someone' })), false)
    process.env.WECARE_DEMO_SERVER_API_KEY = 'a'.repeat(64)
    assert.equal(serverDemoKeyConfigured(), true)
    assert.equal(validServerDemoKey(req({ authorization: 'Bearer ' + 'a'.repeat(64) })), true)
    assert.equal(validServerDemoKey(req({ authorization: 'Bearer ' + 'b'.repeat(64) })), false)
    assert.equal(validServerDemoKey(req({ authorization: 'Bearer ' + 'a'.repeat(63) })), false)
    assert.equal(validServerDemoKey(req({})), false)
  } finally {
    if (previous === undefined) delete process.env.WECARE_DEMO_SERVER_API_KEY
    else process.env.WECARE_DEMO_SERVER_API_KEY = previous
  }
})

test('cross-origin calls are rejected; same-origin and server-originless calls pass', () => {
  assert.equal(originPermitted(req({ origin: 'https://we-care-healthcare-six.vercel.app' })), true)
  assert.equal(originPermitted(req({ origin: 'https://attacker.example' })), false)
  assert.equal(originPermitted(req({})), true) // Server-to-server requests require the key separately.
})

test('availability day filter uses one PostgREST and-clause for both date bounds', () => {
  const query = appointmentDayFilter('2026-11-23')
  assert.equal(query.get('select'), 'starts_at')
  assert.equal(query.getAll('starts_at').length, 0)
  const and = query.get('and')
  assert.equal(and, '(starts_at.gte.2026-11-22T18:30:00.000Z,starts_at.lt.2026-11-23T18:30:00.000Z)')
})
