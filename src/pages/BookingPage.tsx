import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CalendarDays, CheckCircle2, Clock3, Info, ShieldCheck, Users, UserRound, XCircle } from 'lucide-react'
import {
  DEMO_UPDATED, availableSlots, bookDemo, demoDoctors, demoPatients, displayTime,
  formatVisitDate, readDemoBookings, upcomingDays, updateDemoBooking,
  type DemoBooking
} from '../booking/demo'

export default function BookingPage() {
  const [doctorId, setDoctorId] = useState(demoDoctors[0].id)
  const days = useMemo(() => upcomingDays(), [])
  const [date, setDate] = useState(days[0] || '')
  const [time, setTime] = useState('')
  const [patientId, setPatientId] = useState(demoPatients[0].id)
  const [bookings, setBookings] = useState(readDemoBookings)
  const [result, setResult] = useState<DemoBooking | null>(null)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const doctor = demoDoctors.find(item => item.id === doctorId)!
  const patient = demoPatients.find(item => item.id === patientId)!
  const times = availableSlots(doctorId, date, bookings)

  useEffect(() => {
    const refresh = () => setBookings(readDemoBookings())
    window.addEventListener('storage', refresh)
    window.addEventListener(DEMO_UPDATED, refresh)
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener(DEMO_UPDATED, refresh) }
  }, [])

  function confirm() {
    const answer = bookDemo(doctorId, patientId, date, time)
    if (!answer.booking) {
      setError(answer.error ?? 'Something changed. Try selecting another slot.')
      return
    }
    setError('')
    setResult(answer.booking)
    setStep(3)
    setBookings(readDemoBookings())
  }

  function cancel() {
    if (result && updateDemoBooking(result.id, 'cancelled')) {
      setResult({ ...result, status: 'cancelled' })
      setBookings(readDemoBookings())
    } else setError('This sample booking could not be cancelled.')
  }

  function startOver() {
    setTime('')
    setResult(null)
    setError('')
    setStep(1)
    setBookings(readDemoBookings())
  }

  return <main className="booking-page">
    <header className="booking-hero"><div className="container"><span className="booking-overline">WE CARE / PHASE 03</span><h1>Making time for <em>better care.</em></h1>
      <p>Explore a complete appointment workflow with fictional doctors, sample patients and available time slots.</p>
      <div className="booking-notice"><Info size={18} /><span><strong>Interactive demo only.</strong> Appointments are saved only in this browser using fictional identities. Nothing is sent to clinic staff, and no real appointment is made.</span></div>
    </div></header>
    <section className="booking-content container">
      <div className="booking-main">
        <div className="booking-steps" aria-label="Booking progress">
          {[['1','Choose a time'],['2','Review details'],['3','Confirmation']].map(([number,label],index) =>
            <div key={number} className={step >= index + 1 ? 'active' : ''}><span>{number}</span><small>{label}</small></div>)}
        </div>

        {step === 1 && <div className="booking-panel">
          <div className="booking-section-heading"><span>01 / YOUR VISIT</span><h2>Select your clinician.</h2><p>All doctor names and qualifications are fictional demonstration profiles.</p></div>
          <div className="booking-doctors">{demoDoctors.map(item => <button type="button" className={doctorId === item.id ? 'selected' : ''} key={item.id} onClick={() => {setDoctorId(item.id);setTime('');setError('')}} aria-pressed={doctorId === item.id}><UserRound size={19} /><strong>{item.name}</strong><span>{item.department}</span></button>)}</div>
          <div className="booking-section-heading"><span>02 / PREFERRED DATE</span><h2>Pick a day.</h2><p>Sample clinic hours follow India Standard Time (IST). Sundays are unavailable.</p></div>
          <div className="booking-days">{days.map(day => <button key={day} type="button" aria-pressed={date === day} className={date === day ? 'selected' : ''} onClick={() => {setDate(day);setTime('');setError('')}}><CalendarDays size={17} /><span>{formatVisitDate(day)}</span></button>)}</div>
          <div className="booking-section-heading"><span>03 / AVAILABLE TIMES</span><h2>Select a time.</h2><p>Times for {doctor.name} · {doctor.department}</p></div>
          {times.length ? <div className="booking-times">{times.map(slot => <button type="button" key={slot} className={time === slot ? 'selected' : ''} aria-pressed={time === slot} onClick={() => {setTime(slot);setError('')}}><Clock3 size={15} /> {displayTime(slot)}</button>)}</div> : <p className="booking-empty">There are no open demo slots for this date. Please choose another day.</p>}
          {error && <p className="booking-error" role="alert">{error}</p>}
          <button className="button button-dark booking-next" disabled={!time} onClick={() => {setError('');setStep(2)}}>Continue to details <ArrowRight size={17} /></button>
        </div>}

        {step === 2 && <div className="booking-panel">
          <div className="booking-section-heading"><span>04 / SAMPLE PATIENT</span><h2>Review your visit.</h2><p>Choose a fictional patient rather than entering any real personal or medical information.</p></div>
          <label className="booking-patient-label">Demo patient
            <select value={patientId} onChange={event => setPatientId(event.target.value)}>
              {demoPatients.map(person => <option value={person.id} key={person.id}>{person.name}</option>)}
            </select>
          </label>
          <div className="booking-review"><div><span>Doctor</span><strong>{doctor.name}</strong></div><div><span>Department</span><strong>{doctor.department}</strong></div><div><span>Date</span><strong>{formatVisitDate(date)}</strong></div><div><span>Time</span><strong>{displayTime(time)} IST</strong></div><div><span>Example email</span><strong>{patient.email}</strong></div></div>
          <div className="booking-private-note"><ShieldCheck size={19} /> This fictional appointment remains in browser storage. It will not email anyone, reserve a real consultation or collect patient health information.</div>
          {error && <p className="booking-error" role="alert">{error}</p>}
          <div className="booking-panel-actions"><button type="button" className="booking-quiet" onClick={() => {setError('');setStep(1)}}><ArrowLeft size={16} /> Change time</button><button className="button button-dark" onClick={confirm}>Confirm demo booking <CheckCircle2 size={17} /></button></div>
        </div>}

        {step === 3 && result && <div className="booking-panel booking-success">
          {result.status === 'confirmed' ? <CheckCircle2 size={52} /> : <XCircle size={52} />}
          <span className="booking-overline">{result.status === 'confirmed' ? 'SAMPLE BOOKING CREATED' : 'SAMPLE BOOKING CANCELLED'}</span>
          <h2>{result.status === 'confirmed' ? 'You’re all set — for the demo.' : 'Booking cancelled.'}</h2>
          <p>{result.status === 'confirmed' ? 'Your fictional appointment appears below and in the demo staff dashboard.' : 'The sample appointment has been cancelled in this browser.'}</p>
          <div className="booking-ticket"><span>DEMO REFERENCE</span><strong>{result.id}</strong><p>{doctor.name} · {formatVisitDate(result.date)} · {displayTime(result.time)} IST</p></div>
          <div className="booking-panel-actions"><button className="booking-quiet" onClick={startOver}>Book another sample</button>{result.status === 'confirmed' && <button className="booking-quiet" onClick={cancel}>Cancel this sample booking</button>}<Link className="button button-dark" to="/staff-demo">View staff demo <ArrowRight size={16} /></Link></div>
        </div>}
      </div>

      <aside className="booking-side">
        <div className="booking-side-card"><span>YOUR APPOINTMENT</span><h3>At a glance</h3><div><UserRound size={18} /><p>{doctor.name}<small>{doctor.department}</small></p></div><div><CalendarDays size={18} /><p>{formatVisitDate(date)}<small>{time ? displayTime(time) + ' IST' : 'Time not selected'}</small></p></div><div><Users size={18} /><p>{patient.name}<small>Fictional patient</small></p></div><div className="booking-side-separator" /><p className="booking-disclaimer">Sample schedules and availability are for UI testing only. Browser-local data is not shared between devices.</p><Link to="/staff-demo" className="booking-side-link">Open staff dashboard demo <ArrowRight size={16} /></Link></div>
      </aside>
    </section>
  </main>
}
