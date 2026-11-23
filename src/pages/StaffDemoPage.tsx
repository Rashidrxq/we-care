import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck2, ClipboardList, Clock3, RefreshCcw, ShieldAlert, XCircle } from 'lucide-react'
import {
  DEMO_UPDATED, demoDoctors, demoPatients, displayTime, formatVisitDate,
  readDemoBookings, resetDemoBookings, updateDemoBooking, visitTimestamp,
  type DemoBooking
} from '../booking/demo'

export default function StaffDemoPage() {
  const [bookings, setBookings] = useState<DemoBooking[]>(readDemoBookings)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const refresh = () => setBookings(readDemoBookings())
    window.addEventListener('storage', refresh)
    window.addEventListener(DEMO_UPDATED, refresh)
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener(DEMO_UPDATED, refresh) }
  }, [])

  const shown = useMemo(() => bookings.filter(booking => {
    const doctor = demoDoctors.find(item => item.id === booking.doctorId)!
    const patient = demoPatients.find(item => item.id === booking.patientId)!
    const text = [booking.id, booking.date, doctor.name, patient.name].join(' ').toLowerCase()
    return (filter === 'all' || booking.status === filter) && text.includes(query.toLowerCase().trim())
  }).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)), [bookings, filter, query])

  const count = (status: string) => bookings.filter(item => item.status === status).length
  function change(id: string, status: 'cancelled' | 'completed') {
    if (!updateDemoBooking(id, status)) {
      setMessage('Seed records are read-only. Completed status requires a past appointment.')
      return
    }
    setMessage('Fictional appointment updated in this browser.')
    setBookings(readDemoBookings())
  }
  function reset() {
    if (resetDemoBookings()) {setBookings(readDemoBookings());setMessage('Local demo bookings reset. Sample seed records remain.')}
    else setMessage('Browser storage could not be cleared.')
  }

  return <main className="staff-page">
    <header className="staff-heading"><div className="container"><span className="booking-overline">WE CARE / DEMONSTRATION ONLY</span><h1>Staff dashboard <em>preview.</em></h1><p>A working demonstration of appointment oversight using fictional records saved locally in your browser.</p>
      <div className="staff-warning"><ShieldAlert size={21} /><span><strong>Public demo — not a real admin portal.</strong> No login, actual patient data, clinical records or shared database is present. Do not use this screen for real clinic operations.</span></div>
    </div></header>

    <div className="container staff-dashboard">
      <div className="staff-stat-grid"><div><CalendarCheck2 size={20} /><small>Confirmed</small><strong>{count('confirmed')}</strong></div><div><ClipboardList size={20} /><small>Completed</small><strong>{count('completed')}</strong></div><div><XCircle size={20} /><small>Cancelled</small><strong>{count('cancelled')}</strong></div></div>
      <div className="staff-toolbar"><div><h2>Sample appointments</h2><p>{bookings.length} total records, including {bookings.filter(item => item.id.startsWith('SAMPLE-')).length} read-only examples</p></div><div className="staff-actions"><Link to="/book" className="button button-dark">New sample booking <ArrowRight size={16} /></Link><button className="staff-reset" type="button" onClick={reset}><RefreshCcw size={16} /> Reset local data</button></div></div>
      <div className="staff-filters"><label><span className="sr-only">Search bookings</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search doctor, patient, reference or date" /></label><label><span className="sr-only">Filter by status</span><select value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All statuses</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></label></div>
      {message && <p className="staff-message" role="status">{message}</p>}
      <div className="staff-table-scroller"><table className="staff-table"><thead><tr><th>Booking reference</th><th>Fictional patient</th><th>Doctor</th><th>Date &amp; time</th><th>Status</th><th>Actions</th></tr></thead><tbody>{shown.map(item => {
        const doctor = demoDoctors.find(d => d.id === item.doctorId)!
        const patient = demoPatients.find(p => p.id === item.patientId)!
        return <tr key={item.id}><td><strong>{item.id}</strong>{item.id.startsWith('SAMPLE-') && <small>Seed record</small>}</td><td>{patient.name}</td><td>{doctor.name}<small>{doctor.department}</small></td><td>{formatVisitDate(item.date)}<small><Clock3 size={11} /> {displayTime(item.time)} IST</small></td><td><span className={'staff-status ' + item.status}>{item.status}</span></td><td>{item.status === 'confirmed' && !item.id.startsWith('SAMPLE-') ? <div className="staff-inline-actions"><button onClick={() => change(item.id, 'cancelled')}>Cancel</button>{visitTimestamp(item.date, item.time) <= Date.now() && <button onClick={() => change(item.id, 'completed')}>Complete</button>}</div> : <span className="staff-read-only">—</span>}</td></tr>
      })}</tbody></table>{!shown.length && <div className="staff-empty">No sample appointments match your filters.</div>}</div>
      <div className="staff-bottom"><ShieldAlert size={18} /><p>This mock dashboard is intentionally unauthenticated because it uses only fictional data. A real staff portal needs authenticated staff accounts, roles, audit logs and a dedicated secured database before handling patient information.</p></div>
    </div>
  </main>
}
