import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, HeartPulse, Search, ShieldCheck, Stethoscope } from 'lucide-react'
import { careGuides, careDepartments } from '../data/guides'

export default function DepartmentsPage() {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All departments')
  const shown = useMemo(() => {
    const term = search.trim().toLowerCase()
    return careGuides.filter(guide => (department === 'All departments' || guide.department === department) &&
      (!term || [guide.title, guide.department, guide.summary].some(text => text.toLowerCase().includes(term))))
  }, [search, department])

  return <main className="dept-page">
    <header className="dept-hero"><div className="container dept-hero-layout">
      <div className="dept-hero-text"><span className="dept-eyebrow">01 / WE CARE HEALTH LIBRARY</span><h1>Departments &amp;<br /><em>Treatments.</em></h1>
        <p>Good care begins with good information. Explore common conditions, understand what symptoms may mean and discover what diagnosis, treatment and recovery can involve.</p>
        <div className="dept-hero-foot"><span><BookOpen size={17} /> 6 simple condition guides</span><span><ShieldCheck size={17} /> Everyday language</span></div>
      </div>
      <div className="dept-illustration" aria-hidden="true"><div className="dept-ring ring-one" /><div className="dept-ring ring-two" /><div className="dept-icon"><HeartPulse strokeWidth={1.3} /></div><div className="dept-art-text">CARE THAT<br /><strong>MAKES SENSE.</strong></div></div>
    </div></header>

    <section className="dept-directory section-pad"><div className="container">
      <div className="dept-title-row"><div><span className="dept-eyebrow">EXPLORE THE TOPICS</span><h2>Find the answers<br /><em>you’re looking for.</em></h2></div><p>Each guide walks you through common signs, tests, care options and what to expect next.</p></div>
      <div className="dept-controls"><label className="dept-search"><Search size={20} /><span className="sr-only">Search conditions</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search conditions or departments" /></label>
        <div className="dept-filters" role="group" aria-label="Filter by department">
          {['All departments', ...careDepartments].map(item => <button key={item} type="button" aria-pressed={department === item} className={department === item ? 'active' : ''} onClick={() => setDepartment(item)}>{item}</button>)}
        </div><p className="dept-count" role="status">{shown.length} {shown.length === 1 ? 'guide' : 'guides'} available</p>
      </div>
      {shown.length ? <div className="dept-cards">{shown.map((guide, index) =>
        <Link to={'/departments/' + guide.slug} className="dept-card" key={guide.slug}>
          <div className="dept-card-head"><span>0{index + 1} / HEALTH GUIDE</span><Stethoscope size={21} /></div>
          <span className="dept-card-category">{guide.department}</span><h3>{guide.title}</h3><p>{guide.summary}</p>
          <div className="dept-card-tail"><span>Symptoms · Diagnosis · Treatment · Recovery</span><ArrowUpRight size={19} /></div>
        </Link>)}</div> : <div className="dept-no-results"><h3>No matching guides.</h3><p>Try another term or view all departments.</p><button className="button button-dark" onClick={() => { setSearch(''); setDepartment('All departments') }}>Show all guides</button></div>}
    </div></section>
    <section className="dept-bottom-note"><div className="container dept-bottom-inner"><div><span>IMPORTANT TO KNOW</span><h2>Every person is <em>different.</em></h2><p>These pages provide general education, not a diagnosis or proof of available clinic services. A qualified healthcare professional can help with your own symptoms. Seek urgent care for serious warning signs.</p></div><Link to="/#appointment" className="button button-dark">View appointment demo <ArrowRight size={16} /></Link></div></section>
  </main>
}