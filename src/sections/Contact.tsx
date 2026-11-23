import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const details = [
  { icon: MapPin, label: 'VISIT US', value: '[Clinic address to be added]' },
  { icon: Phone, label: 'CALL US', value: '[Clinic phone number]' },
  { icon: Mail, label: 'EMAIL', value: '[Clinic email address]' },
  { icon: Clock3, label: 'OPENING HOURS', value: '[Clinic hours to be added]' },
]

export default function Contact() {
  return <section className="contact-section section-pad" id="contact"><div className="container">
    <SectionHeading eyebrow="06 / GET IN TOUCH" title={<>We’re here<br /><em>when you need us.</em></>} description="Have a question before your visit? Reach out using the clinic’s verified contact details once they’re added here." />
    <div className="contact-grid reveal"><div className="contact-details">
      {details.map(({ icon: Icon, label, value }) => <div className="contact-item" key={label}><span><Icon /></span><div><small>{label}</small><strong>{value}</strong></div></div>)}
      <a href="#appointment" className="button button-dark contact-cta">Request a call back <span>↗</span></a>
      <span className="whatsapp-link"><MessageCircle size={17} /> WhatsApp details to be added</span>
    </div>
    <div className="map-placeholder"><div className="map-grid" /><div className="map-card"><span><MapPin size={20} /></span><strong>Find WE CARE</strong><p>Google Maps location will appear here once the clinic address is confirmed.</p><small>LOCATION PLACEHOLDER</small></div><div className="map-coordinates">MAP / LOCATION</div></div>
    </div>
  </div></section>
}