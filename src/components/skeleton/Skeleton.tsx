import { memo } from 'react'

type SkeletonProps = {
  className?: string
  variant?: 'rectangular' | 'circular' | 'text'
}

export const Skeleton = memo(function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'bg-gray-800 animate-pulse'

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  )
})
