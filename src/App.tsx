import { useEffect } from 'react'
import { motion } from 'framer-motion'
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

export default function App() {
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
  }, [])

  return <motion.div className="site-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
    <Navbar />
    <main><Hero /><About /><Services /><WhyChooseUs /><Doctors /><Testimonials /><Appointment /><Contact /></main>
    <Footer />
  </motion.div>
}