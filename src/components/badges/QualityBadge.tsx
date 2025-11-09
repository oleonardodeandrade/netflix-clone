import { memo } from 'react'

type QualityBadgeProps = {
  quality: 'HD' | '4K' | 'HDR' | 'Ultra HD 4K'
  className?: string
}

export const QualityBadge = memo(function QualityBadge({ quality, className = '' }: QualityBadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white border border-white/60 rounded-sm ${className}`}
    >
      {quality}
    </div>
  )
})
