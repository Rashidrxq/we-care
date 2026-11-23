import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/clinic'

export default function Services() {
  return <section className="services-section section-pad" id="services"><div className="container">
    <SectionHeading eyebrow="02 / OUR SERVICES" title={<>Care for every<br /><em>part of life.</em></>} description="From everyday health concerns to preventive care, we’re here to help you take your next step with confidence." />
    <div className="service-grid">{services.map(({ icon: Icon, number, title, description }) => <article className="service-card reveal" key={title}>
      <div className="service-top"><span>{number} / 06</span><Icon size={23} strokeWidth={1.5} /></div><h3>{title}</h3><p>{description}</p>
      <a href="/book" aria-label={`Request an appointment for ${title}`} className="service-arrow"><ArrowUpRight size={18} /></a>
    </article>)}</div>
    <a className="services-explore" href="/departments">Explore departments &amp; treatments <ArrowUpRight size={17} /></a>
  </div></section>
}