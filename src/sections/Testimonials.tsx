import { Quote } from 'lucide-react'

const sampleReviews = [
  { quote: 'The team took time to listen and explain each step. I felt comfortable asking questions.', name: '[Patient name — replace with verified review]' },
  { quote: 'A welcoming environment and a thoughtful approach made the visit feel much easier.', name: '[Patient name — replace with verified review]' },
]

export default function Testimonials() {
  return <section className="testimonials-section section-pad"><div className="container">
    <div className="section-kicker reveal"><span>WHAT PATIENTS MAY SAY</span><span className="kicker-rule" /></div>
    <div className="testimonial-heading reveal"><h2>Kind words.<br /><em>Meaningful care.</em></h2><p>Illustrative placeholder copy only. Replace with patient reviews that have been genuinely collected and approved for publication.</p></div>
    <div className="testimonial-grid">{sampleReviews.map((review, i) => <article className="testimonial-card reveal" key={i}><Quote size={21} /><p>“{review.quote}”</p><small>{review.name}</small><span>PLACEHOLDER REVIEW</span></article>)}</div>
  </div></section>
}