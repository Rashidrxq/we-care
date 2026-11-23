import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Brand from './Brand'
import { navigation } from '../data/clinic'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="announcement"><span className="announcement-dot" /> A more personal approach to healthcare
        <span className="announcement-right">Here for your wellbeing, every step of the way <ArrowUpRight size={13} /></span>
      </div>
      <header className="header">
        <div className="container nav-wrap">
          <Brand />
          <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
            {navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
            <a className="mobile-book" href="#appointment" onClick={() => setOpen(false)}>Book an appointment <ArrowUpRight size={15} /></a>
          </nav>
          <a className="button button-dark nav-cta" href="#appointment">Book an appointment <ArrowUpRight size={16} /></a>
          <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  )
}