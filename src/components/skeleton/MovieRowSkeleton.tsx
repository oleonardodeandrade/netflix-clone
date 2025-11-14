import { memo } from 'react'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { Skeleton } from './Skeleton'

export const MovieRowSkeleton = memo(function MovieRowSkeleton() {
  return (
    <div className="space-y-3 mb-8">
      <Skeleton className="h-8 w-48 mx-4 md:mx-8" />

      <div className="px-4 md:px-8">
        <div className="flex gap-2 md:gap-3 overflow-hidden py-4 md:py-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0"
            >
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
