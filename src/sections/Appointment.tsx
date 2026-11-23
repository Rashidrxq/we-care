import { useState, type FormEvent } from 'react'
import { CalendarDays, MessageCircle, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { services, doctors } from '../data/clinic'

export default function Appointment() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 550))
    setLoading(false)
    setSubmitted(true)
    form.reset()
  }

  return <section className="appointment-section section-pad" id="appointment"><div className="container appointment-grid">
    <div className="appointment-copy reveal"><div className="section-kicker"><span>05 / YOUR NEXT STEP</span><span className="kicker-rule" /></div><h2>Let’s make time<br />for <em>your health.</em></h2>
      <p>Try the appointment request experience using sample information. This preview does not contact clinic staff, store submissions or reserve an appointment.</p>
      <div className="appointment-promise"><span><CalendarDays size={19} /></span><div><strong>A simple first step</strong><small>Explore the sample form in just a few moments.</small></div></div>
      <div className="appointment-promise"><span><MessageCircle size={19} /></span><div><strong>Demo confirmation only</strong><small>No request is sent and no appointment is confirmed.</small></div></div>
    </div>
    <div className="appointment-form-wrap reveal">
      {submitted ? <div className="success-panel" role="status"><CheckCircle2 size={42} /><span>DEMO REQUEST RECEIVED</span><h3>Thank you for reaching out.</h3><p>This is a front-end demonstration. Your details were not sent to the clinic or stored, and no appointment has been confirmed.</p><button className="button button-dark" onClick={() => setSubmitted(false)}>Send another request <ArrowUpRight size={16} /></button></div> :
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-heading"><span>APPOINTMENT FORM DEMO</span><span>* REQUIRED FIELDS</span></div>
        <div className="form-row"><label>Patient name *<input name="name" placeholder="e.g. Asha Nair (sample)" autoComplete="name" required minLength={2} /></label><label>Phone number *<input name="phone" placeholder="+91 00000 00000" autoComplete="tel" type="tel" required pattern="[+0-9() -]{8,18}" /></label></div>
        <label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" /></label>
        <div className="form-row"><label>Medical department<select name="department" defaultValue=""><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title}>{s.title}</option>)}</select></label><label>Preferred doctor<select name="doctor" defaultValue=""><option value="">No preference</option>{doctors.map((d, i) => <option key={i}>Dr. {d.name}</option>)}</select></label></div>
        <label>Preferred date<input name="date" type="date" min={new Date().toISOString().split('T')[0]} /></label>
        <label>Anything you’d like us to know<textarea name="message" rows={3} placeholder="Share a little about how we can help…" /></label>
        <button className="button button-dark submit-button" type="submit" disabled={loading}>{loading ? 'Sending request…' : 'Preview request'} <ArrowUpRight size={16} /></button>
        <p className="form-disclaimer">This is a UI-only demo; nothing is transmitted or stored. Use fictional details, not real medical or personal information.</p>
      </form>}
    </div>
  </div></section>
}