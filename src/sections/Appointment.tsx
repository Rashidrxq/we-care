import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarCheck2, Clock3, ShieldCheck } from 'lucide-react'

export default function Appointment() {
  return <section className="appointment-section section-pad" id="appointment"><div className="container appointment-grid">
    <div className="appointment-copy reveal">
      <div className="section-kicker"><span>05 / YOUR NEXT STEP</span><span className="kicker-rule" /></div>
      <h2>Let’s make time<br />for <em>your health.</em></h2>
      <p>Explore our new step-by-step appointment experience with fictional patients, sample doctors and available time slots.</p>
      <div className="appointment-promise"><span><Clock3 size={19} /></span><div><strong>Choose an available time</strong><small>See opening hours and fictional clinician schedules.</small></div></div>
      <div className="appointment-promise"><span><ShieldCheck size={19} /></span><div><strong>Built for safe testing</strong><small>No real patient details or requests are processed.</small></div></div>
    </div>
    <div className="appointment-form-wrap appointment-launch reveal">
      <div className="form-heading"><span>ONLINE BOOKING DEMO</span><span>PHASE 03</span></div>
      <span className="appointment-launch-icon"><CalendarCheck2 size={34} /></span>
      <h3>Find a time that works.</h3>
      <p>See demo availability, choose a sample patient, confirm a fictional appointment and view it in the staff dashboard preview.</p>
      <Link to="/book" className="button button-dark">Explore booking slots <ArrowUpRight size={17} /></Link>
      <Link to="/staff-demo" className="appointment-staff-link">Preview staff dashboard <ArrowUpRight size={15} /></Link>
      <small>This is a working browser-local demonstration, not a live clinic booking service.</small>
    </div>
  </div></section>
}