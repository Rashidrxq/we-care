import { Link, useParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, ClipboardList, HeartHandshake, HeartPulse, ShieldCheck } from 'lucide-react'
import { careGuides } from '../data/guides'

const parts = [
  ['symptoms', 'Symptoms'],
  ['diagnosis', 'Diagnosis and tests'],
  ['treatment', 'Treatment options'],
  ['recovery', 'Recovery and follow-up']
]

export default function ConditionPage() {
  const { slug } = useParams()
  const guide = careGuides.find(item => item.slug === slug)
  if (!guide) return <main className="dept-missing"><div className="container"><span>PAGE NOT FOUND</span><h1>We couldn’t find that guide.</h1><p>Browse the available health topics below.</p><Link to="/departments" className="button button-dark">All guides <ArrowRight size={16} /></Link></div></main>
  const related = careGuides.filter(item => item.slug !== guide.slug).slice(0, 3)

  return <main className="guide-page">
    <header className="guide-hero"><div className="container">
      <nav className="guide-crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><Link to="/departments">Departments &amp; Treatments</Link><ChevronRight size={14} /><span aria-current="page">{guide.title}</span></nav>
      <div className="guide-hero-content"><div><span className="guide-eyebrow">{guide.department} / PATIENT GUIDE</span><h1>{guide.title}<span>.</span></h1><p>{guide.intro}</p><a href="#symptoms" className="guide-jump">Read the guide <ArrowRight size={17} /></a></div>
        <div className="guide-hero-art" aria-hidden="true"><HeartPulse size={108} strokeWidth={0.9} /><span>UNDERSTANDING<br /><strong>COMES FIRST.</strong></span></div>
      </div>
    </div></header>
    <div className="container guide-layout">
      <aside className="guide-sidebar"><div className="guide-sidebar-sticky"><strong>IN THIS GUIDE</strong><nav aria-label="Guide sections">{parts.map(([id, label], i) => <a key={id} href={'#' + id}><small>0{i + 1}</small><span>{label}</span><ArrowUpRight size={14} /></a>)}</nav>
        <div className="guide-sidebar-note"><ShieldCheck size={20} /><p>General information only. Diagnosis and care always depend on the individual.</p></div><Link className="guide-back" to="/departments"><ArrowLeft size={16} /> View all conditions</Link></div></aside>
      <article className="guide-body">
        <div className="guide-summary"><BookOpen size={23} /><div><strong>IN A NUTSHELL</strong><p>{guide.summary}</p></div></div>
        <section className="guide-section" id="symptoms"><span className="guide-section-num">01 / RECOGNISING THE SIGNS</span><h2>What are the <em>symptoms?</em></h2><p>Symptoms can vary. Not everyone experiences all of the following.</p><ul className="guide-symptom-list">{guide.symptoms.map(item => <li key={item}><CheckCircle2 size={19} /><span>{item}</span></li>)}</ul></section>
        <section className="guide-section" id="diagnosis"><span className="guide-section-num">02 / GETTING ANSWERS</span><h2>How is it <em>diagnosed?</em></h2><p>{guide.diagnosisIntro}</p><div className="guide-steps">{guide.diagnosis.map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div></section>
        <section className="guide-section" id="treatment"><span className="guide-section-num">03 / CARE OPTIONS</span><h2>What treatment <em>may help?</em></h2><p>{guide.treatmentIntro}</p><ul className="guide-treatment-list">{guide.treatments.map(item => <li key={item}><HeartHandshake size={18} /><p>{item}</p></li>)}</ul></section>
        <section className="guide-section" id="recovery"><span className="guide-section-num">04 / WHAT COMES NEXT</span><h2>Recovery &amp; <em>follow-up.</em></h2><p>{guide.recoveryIntro}</p><div className="guide-recovery"><ClipboardList size={23} /><ul>{guide.recovery.map(item => <li key={item}>{item}</li>)}</ul></div></section>
        <section className="guide-warning" aria-labelledby="warning-title"><div><AlertCircle size={22} /><span>WHEN TO GET HELP</span></div><h2 id="warning-title">Know the warning signs.</h2><p>Seek urgent assessment or emergency care when appropriate for these symptoms:</p><ul>{guide.urgent.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section className="guide-sources"><div><BookOpen size={19} /><h2>Sources &amp; further reading</h2></div><p>These general guides link to established patient-information resources. They have not been reviewed by a clinician from this fictional demo clinic.</p><ul>{guide.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={14} /></a></li>)}</ul></section>
        <div className="guide-actions"><Link to="/departments"><ArrowLeft size={16} /> All conditions</Link><Link to="/#appointment">Appointment demo <ArrowRight size={16} /></Link></div>
      </article>
    </div>
    <section className="guide-related"><div className="container"><span className="guide-section-num">KEEP EXPLORING</span><h2>More health, <em>made simple.</em></h2><div className="guide-related-grid">{related.map(item => <Link key={item.slug} to={'/departments/' + item.slug}><small>{item.department}</small><strong>{item.title}</strong><ArrowUpRight size={17} /></Link>)}</div></div></section>
  </main>
}