import { Quote } from 'lucide-react'

const sampleReviews = [
  { quote: 'The team took time to listen and explain each step. I felt comfortable asking questions.', name: 'Anjali P. · Fictional example' },
  { quote: 'A welcoming environment and a thoughtful approach made the visit feel much easier.', name: 'Rahul K. · Fictional example' },
]

export default function Testimonials() {
  return <section className="testimonials-section section-pad"><div className="container">
    <div className="section-kicker reveal"><span>SAMPLE PATIENT STORIES</span><span className="kicker-rule" /></div>
    <div className="testimonial-heading reveal"><h2>Kind words.<br /><em>Meaningful care.</em></h2><p>These are fictional example reviews used only to show the layout. They are not endorsements or feedback from real patients.</p></div>
    <div className="testimonial-grid">{sampleReviews.map((review, i) => <article className="testimonial-card reveal" key={i}><Quote size={21} /><p>“{review.quote}”</p><small>{review.name}</small><span>FICTIONAL DEMO REVIEW</span></article>)}</div>
  </div></section>
}