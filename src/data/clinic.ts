import {
  Stethoscope, HeartHandshake, ClipboardCheck, Microscope, Baby, HeartPulse,
} from 'lucide-react'

export const navigation = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Departments & Treatments', href: '/departments' },
  { label: 'Our doctors', href: '/#doctors' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Book a demo visit', href: '/book' },
]

export const clinicDetails = {
  name: 'WE CARE Healthcare',
  locationName: 'Kozhikode, Kerala',
  address: '2nd Floor, Sample Wellness Centre, Mavoor Road, Kozhikode, Kerala 673004',
  phone: '+91 00000 00000',
  email: 'hello@wecare.example',
  hours: 'Mon–Sat · 9:00 AM–6:00 PM',
  sunday: 'Sunday · Closed',
} as const

// Fictional demo information. Replace with verified clinic details before launch.
export const services = [
  { icon: Stethoscope, number: '01', title: 'General Medicine', description: 'Thoughtful diagnosis and treatment for everyday health concerns and ongoing conditions.' },
  { icon: HeartHandshake, number: '02', title: 'Family Healthcare', description: 'Connected, continuous care for every age and every stage of family life.' },
  { icon: ClipboardCheck, number: '03', title: 'Preventive Checkups', description: 'Proactive health assessments designed around your needs and wellbeing.' },
  { icon: Microscope, number: '04', title: 'Diagnostic Services', description: 'Helpful investigations to support informed decisions about your health.' },
  { icon: Baby, number: '05', title: 'Pediatric Care', description: 'Gentle, attentive healthcare for children, from routine visits to common concerns.' },
  { icon: HeartPulse, number: '06', title: 'Women’s Healthcare', description: 'Respectful, personalized support for women’s health and wellness.' },
]

export const doctors = [
  { name: 'Ananya Nair', role: 'General Physician', qualification: 'MBBS, MD (Medicine) · Sample', experience: '8 years · Sample', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85' },
  { name: 'Fathima Rahman', role: 'Pediatrician', qualification: 'MBBS, MD (Pediatrics) · Sample', experience: '6 years · Sample', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85' },
  { name: 'Meera Krishnan', role: 'Women’s Healthcare', qualification: 'MBBS, DGO · Sample', experience: '10 years · Sample', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85' },
]

export const carePrinciples = [
  { title: 'Care that listens', description: 'We make space for your questions, concerns and choices.' },
  { title: 'A personal approach', description: 'Care shaped around your health, preferences and circumstances.' },
  { title: 'A welcoming environment', description: 'A calm, considered space designed to help you feel at ease.' },
  { title: 'Care made convenient', description: 'A straightforward way to request appointments and plan your visit.' },
]