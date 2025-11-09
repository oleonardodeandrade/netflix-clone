import { memo } from 'react'

type BadgeVariant = 'new' | 'recently-added' | 'leaving-soon' | 'new-season'

type BadgeProps = {
  variant: BadgeVariant
  className?: string
}

const badgeConfig: Record<BadgeVariant, { text: string; className: string }> = {
  'new': {
    text: 'New',
    className: 'bg-red-600 text-white',
  },
  'recently-added': {
    text: 'Recently Added',
    className: 'bg-red-600 text-white',
  },
  'leaving-soon': {
    text: 'Leaving Soon',
    className: 'bg-red-600 text-white',
  },
  'new-season': {
    text: 'New Season',
    className: 'bg-red-600 text-white',
  },
}

export const Badge = memo(function Badge({ variant, className = '' }: BadgeProps) {
  const config = badgeConfig[variant]

  return (
    <div
      className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold uppercase tracking-wide rounded-sm ${config.className} ${className}`}
    >
      {config.text}
    </div>
  )
})
