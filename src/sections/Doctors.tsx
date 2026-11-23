import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { doctors } from '../data/clinic'

export default function Doctors() {
  return <section className="doctors-section section-pad" id="doctors"><div className="container">
    <SectionHeading eyebrow="04 / OUR PEOPLE" title={<>Meet the people<br />behind <em>your care.</em></>} description="Our team is here to listen, guide and support you. The names, qualifications and portraits below are fictional examples for this website preview, not verified medical staff." />
    <div className="doctor-grid">{doctors.map((doctor, i) => <article className="doctor-card reveal" key={`${doctor.role}-${i}`}>
      <div className="doctor-image"><img src={doctor.image} alt="Illustrative stock portrait, not actual clinic staff" loading="lazy" /><span className="profile-placeholder">FICTIONAL DEMO PROFILE</span></div>
      <div className="doctor-meta"><div><h3>Dr. {doctor.name}</h3><p>{doctor.role}</p></div><span className="doctor-index">0{i + 1}</span></div>
      <div className="doctor-credentials"><span>{doctor.qualification}</span><span>{doctor.experience}</span></div>
      <a href="/book" className="doctor-link">Request a visit <ArrowUpRight size={15} /></a>
    </article>)}</div>
  </div></section>
}