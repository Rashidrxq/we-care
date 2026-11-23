import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import WhyChooseUs from './sections/WhyChooseUs'
import Doctors from './sections/Doctors'
import Testimonials from './sections/Testimonials'
import Appointment from './sections/Appointment'
import Contact from './sections/Contact'
import DepartmentsPage from './pages/DepartmentsPage'
import ConditionPage from './pages/ConditionPage'
import BookingPage from './pages/BookingPage'
import StaffDemoPage from './pages/StaffDemoPage'
import { careGuides } from './data/guides'

function HomePage() {
  return <main><Hero /><About /><Services /><WhyChooseUs /><Doctors /><Testimonials /><Appointment /><Contact /></main>
}

export default function App() {
  const location = useLocation()
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const match = careGuides.find(item => location.pathname === '/departments/' + item.slug)
    document.title = match ? match.title + ' | WE CARE Health Library'
      : location.pathname === '/departments' ? 'Departments & Treatments | WE CARE'
      : location.pathname === '/book' ? 'Appointment Booking Demo | WE CARE'
      : location.pathname === '/staff-demo' ? 'Staff Dashboard Demo | WE CARE'
      : 'WE CARE — Healthcare that puts you first'
    if (location.hash) window.requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView())
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return <motion.div className="site-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/departments/:slug" element={<ConditionPage />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="/staff-demo" element={<StaffDemoPage />} />
      <Route path="*" element={<DepartmentsPage />} />
    </Routes>
    <Footer />
  </motion.div>
}