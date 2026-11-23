import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Brand from './Brand'
import { services } from '../data/clinic'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand-col"><Brand /><p>Healthcare that puts you first. A more thoughtful approach to feeling well.</p>
          <div className="social-links"><a href="#contact" aria-label="Instagram placeholder"><Instagram /></a><a href="#contact" aria-label="Facebook placeholder"><Facebook /></a><a href="#contact" aria-label="LinkedIn placeholder"><Linkedin /></a></div>
        </div>
        <div className="footer-col"><span>EXPLORE</span><a href="#about">About us</a><a href="#services">Our services</a><a href="#doctors">Our doctors</a><a href="#appointment">Appointments</a></div>
        <div className="footer-col"><span>OUR SERVICES</span>{services.slice(0, 4).map(s => <a href="#services" key={s.title}>{s.title}</a>)}</div>
        <div className="footer-col"><span>CONTACT</span><a href="#contact">[Clinic address]</a><a href="#contact">[Phone number]</a><a href="#contact">[Email address]</a><a href="#contact">Opening hours</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} WE CARE. All rights reserved.</span><span>MADE WITH CARE, FOR YOUR WELLBEING.</span><a href="#home">Back to top ↑</a></div>
    </footer>
  )
}