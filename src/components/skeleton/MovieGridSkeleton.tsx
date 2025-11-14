import { memo } from 'react'
import { Skeleton } from './Skeleton'

type MovieGridSkeletonProps = {
  count?: number
}

export const MovieGridSkeleton = memo(function MovieGridSkeleton({ count = 12 }: MovieGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} className="aspect-video" />
      ))}
    </div>
  )
})
