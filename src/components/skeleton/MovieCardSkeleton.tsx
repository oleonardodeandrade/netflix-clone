import { memo } from 'react'
import { Skeleton } from './Skeleton'

export const MovieCardSkeleton = memo(function MovieCardSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="w-full aspect-video" />
    </div>
  )
})
