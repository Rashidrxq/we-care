import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }

export default function Button({ children, className = '', ...props }: Props) {
  return <a className={`button button-dark ${className}`} {...props}>{children}<ArrowUpRight size={16} /></a>
}