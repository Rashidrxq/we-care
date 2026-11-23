import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: ReactNode; description?: string }

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="section-heading reveal">
      <div>
        <div className="section-kicker"><span>{eyebrow}</span><span className="kicker-rule" /></div>
        <h2>{title}</h2>
      </div>
      {description && <div className="section-heading-aside"><p>{description}</p></div>}
    </div>
  )
}