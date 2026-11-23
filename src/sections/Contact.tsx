import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { clinicDetails } from '../data/clinic'

const details = [
  { icon: MapPin, label: 'DEMO ADDRESS', value: clinicDetails.address },
  { icon: Phone, label: 'SAMPLE PHONE', value: clinicDetails.phone },
  { icon: Mail, label: 'SAMPLE EMAIL', value: clinicDetails.email },
  { icon: Clock3, label: 'SAMPLE OPENING HOURS', value: `${clinicDetails.hours} · ${clinicDetails.sunday}` },
]

export default function Contact() {
  return <section className="contact-section section-pad" id="contact"><div className="container">
    <SectionHeading eyebrow="06 / GET IN TOUCH" title={<>We’re here<br /><em>when you need us.</em></>} description="WE CARE is a website demo. The following address, phone number, email and hours are illustrative, not verified contact details for a real clinic." />
    <div className="contact-grid reveal"><div className="contact-details">
      {details.map(({ icon: Icon, label, value }) => <div className="contact-item" key={label}><span><Icon /></span><div><small>{label}</small><strong>{value}</strong></div></div>)}
      <a href="#appointment" className="button button-dark contact-cta">Preview appointment form <span>↗</span></a>
      <span className="whatsapp-link"><MessageCircle size={17} /> WhatsApp is not connected in this demo.</span>
    </div>
    <div className="map-placeholder"><div className="map-grid" /><div className="map-card"><span><MapPin size={20} /></span><strong>{clinicDetails.locationName}</strong><p>Illustrative clinic location only. No verified address or map pin is available.</p><small>DEMO LOCATION · NOT NAVIGATION</small></div><div className="map-coordinates">SAMPLE / KOZHIKODE, KERALA</div></div>
    </div>
  </div></section>
}