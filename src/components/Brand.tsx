import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="WE CARE home">
      <span className="brand-mark"><Plus size={21} strokeWidth={2.5} /></span>
      <span className="brand-copy">WE CARE<span>YOUR HEALTH, OUR PRIORITY</span></span>
    </Link>
  )
}