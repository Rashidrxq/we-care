import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Brand from './Brand'
import { clinicDetails, services } from '../data/clinic'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand-col"><Brand /><p>Healthcare that puts you first. Demo website with fictional clinic information.</p>
          <div className="social-links"><a href="#contact" aria-label="Instagram placeholder"><Instagram /></a><a href="#contact" aria-label="Facebook placeholder"><Facebook /></a><a href="#contact" aria-label="LinkedIn placeholder"><Linkedin /></a></div>
        </div>
        <div className="footer-col"><span>EXPLORE</span><a href="#about">About us</a><a href="#services">Our services</a><a href="#doctors">Our doctors</a><a href="#appointment">Appointment demo</a></div>
        <div className="footer-col"><span>OUR SERVICES</span>{services.slice(0, 4).map(s => <a href="#services" key={s.title}>{s.title}</a>)}</div>
        <div className="footer-col"><span>DEMO CONTACT</span><a href="#contact">{clinicDetails.locationName}</a><a href="#contact">{clinicDetails.phone}</a><a href="#contact">{clinicDetails.email}</a><a href="#contact">{clinicDetails.hours}</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} WE CARE. All rights reserved.</span><span>DEMO WEBSITE · FICTIONAL CLINIC DATA</span><a href="#home">Back to top ↑</a></div>
    </footer>
  )
}