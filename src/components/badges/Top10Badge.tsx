import { memo } from 'react'

type Top10BadgeProps = {
  rank: number
  className?: string
}

export const Top10Badge = memo(function Top10Badge({ rank, className = '' }: Top10BadgeProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="relative">
        <div className="bg-red-600 text-white font-bold text-xs px-1.5 py-0.5 rounded-sm">
          TOP
        </div>
        <div className="bg-red-600 text-white font-bold text-xs px-1.5 py-0.5 rounded-sm mt-0.5">
          10
        </div>
      </div>
      <div className="text-2xl font-bold text-white">
        #{rank}
      </div>
    </div>
  )
})
