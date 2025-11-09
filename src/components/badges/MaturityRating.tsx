import { memo } from 'react'

type MaturityRatingProps = {
  rating: string
  className?: string
}

export const MaturityRating = memo(function MaturityRating({ rating, className = '' }: MaturityRatingProps) {
  return (
    <div
      className={`inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white border border-white/60 rounded-sm ${className}`}
    >
      {rating}
    </div>
  )
})
