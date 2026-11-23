import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Brand from './Brand'
import { navigation } from '../data/clinic'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="announcement"><span className="announcement-dot" /> DEMO WEBSITE · SAMPLE CLINIC INFORMATION
      <span className="announcement-right">No real appointments are accepted <ArrowUpRight size={13} /></span>
    </div>
    <header className="header"><div className="container nav-wrap">
      <Brand />
      <nav className={'nav-links ' + (open ? 'open' : '')} aria-label="Main navigation">
        {navigation.map(item => <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link className="mobile-book" to="/#appointment" onClick={() => setOpen(false)}>Appointment demo <ArrowUpRight size={15} /></Link>
      </nav>
      <Link className="button button-dark nav-cta" to="/#appointment">Appointment demo <ArrowUpRight size={16} /></Link>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div></header>
  </>
}
