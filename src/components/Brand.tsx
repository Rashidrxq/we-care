import { Plus } from 'lucide-react'

export default function Brand() {
  return (
    <a className="brand" href="#home" aria-label="WE CARE home">
      <span className="brand-mark"><Plus size={21} strokeWidth={2.5} /></span>
      <span className="brand-copy">WE CARE<span>YOUR HEALTH, OUR PRIORITY</span></span>
    </a>
  )
}