import SectionHeading from '../components/SectionHeading'
import { carePrinciples } from '../data/clinic'
import { ChevronRight } from 'lucide-react'

export default function WhyChooseUs() {
  return <section className="difference-section section-pad"><div className="container difference-grid">
    <div className="difference-photo reveal"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1100&q=85" alt="Healthcare professional discussing a care plan with a patient" loading="lazy" /><div className="photo-note"><span>THE WE CARE APPROACH</span><strong>Care is a connection.</strong></div></div>
    <div className="difference-copy reveal"><div className="section-kicker"><span>03 / WHY WE CARE</span><span className="kicker-rule" /></div><h2>Small details.<br /><em>A meaningful difference.</em></h2>
      <p className="difference-lead">Feeling cared for should never be an afterthought. It’s part of the experience we want to create, from your first hello to your follow-up.</p>
      <div className="reason-list">{carePrinciples.map((item, i) => <div className="reason-item" key={item.title}><span>0{i + 1}</span><div><strong>{item.title}</strong><p>{item.description}</p></div><ChevronRight size={17} /></div>)}</div>
    </div>
  </div></section>
}