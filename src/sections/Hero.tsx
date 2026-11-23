import { ArrowDown, ArrowRight, ArrowUpRight, HeartHandshake } from 'lucide-react'
import Button from '../components/Button'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> CARE, WITH YOU IN MIND</div>
          <h1>Healthcare that<br /><em>puts you first.</em></h1>
          <p className="hero-description">Compassionate care, experienced professionals, and a healthier tomorrow. Your well-being is at the heart of everything we do.</p>
          <div className="hero-actions"><Button href="#appointment">Try appointment demo</Button><a className="text-link" href="#services">Explore our services <ArrowRight size={16} /></a></div>
          <div className="hero-footnote"><span className="avatar-stack"><i>W</i><i>C</i><i>+</i></span><span>Personal attention.<br /><strong>Care you can feel.</strong></span><span className="footnote-divider" /><span className="footnote-note">A thoughtful approach<br />to every visit.</span></div>
        </div>
        <div className="hero-visual">
          <img src="/images/clinic-consultation.png" alt="Doctor having a calm, attentive conversation with a patient" />
          <div className="image-caption"><span className="caption-icon"><HeartHandshake size={19} /></span><span><strong>Care comes first</strong><small>Every person. Every visit.</small></span><ArrowUpRight size={17} /></div>
          <div className="hero-image-index">01 <span /> 03</div>
        </div>
        <div className="hero-side-note">HEALTH IS PERSONAL. SO IS OUR CARE.</div>
      </div>
      <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
    </section>
  )
}