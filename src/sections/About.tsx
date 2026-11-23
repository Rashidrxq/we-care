import { HeartHandshake, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react'

const values = [
  { icon: HeartHandshake, title: 'Patient-first', text: 'Your needs guide every decision.' },
  { icon: ShieldCheck, title: 'Trust-led', text: 'Clear, respectful communication.' },
  { icon: Sparkles, title: 'Personal care', text: 'Attention to the person, not just symptoms.' },
]

export default function About() {
  return (
    <section className="intro-section section-pad" id="about">
      <div className="container intro-grid">
        <div className="section-kicker reveal"><span>01 / ABOUT WE CARE</span><span className="kicker-rule" /></div>
        <div className="intro-content reveal"><h2>Good healthcare starts with <em>being heard.</em></h2>
          <div className="intro-bottom"><p>At WE CARE, we believe healthcare should feel human. It begins with listening, grows through trust, and is guided by a genuine commitment to your wellbeing.</p><a href="#contact" className="circle-link" aria-label="Get in touch"><ArrowUpRight /></a></div>
        </div>
        <div className="intro-aside reveal"><div className="aside-number">01<span>/</span>04</div><p>Not just a consultation. A conversation that helps you feel understood, informed and cared for.</p></div>
      </div>
      <div className="container value-strip reveal">{values.map(({ icon: Icon, title, text }) => <div key={title}><span className="value-icon"><Icon /></span><strong>{title}</strong><small>{text}</small></div>)}</div>
    </section>
  )
}