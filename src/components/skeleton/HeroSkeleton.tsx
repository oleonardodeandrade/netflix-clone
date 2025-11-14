import { memo } from 'react'
import { Skeleton } from './Skeleton'

export const HeroSkeleton = memo(function HeroSkeleton() {
  return (
    <div className="relative h-[80vh] bg-gradient-to-b from-black via-transparent to-black">
      <Skeleton className="absolute inset-0" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-6">
        <Skeleton className="h-12 md:h-16 w-3/4 md:w-1/2" />

        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-5/6 max-w-2xl" />
        <Skeleton className="h-4 w-4/6 max-w-2xl" />

        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  )
})
