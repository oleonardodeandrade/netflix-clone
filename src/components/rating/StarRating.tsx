import { useState } from 'react'

type StarRatingProps = {
  value: number
  onChange: (rating: number) => void
  readonly?: boolean
}

export function StarRating({ value, onChange, readonly = false }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const displayValue = hoverValue || value

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
        <button
          key={rating}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange(rating)}
          onMouseEnter={() => !readonly && setHoverValue(rating)}
          onMouseLeave={() => !readonly && setHoverValue(0)}
          className={`transition-all ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <svg
            className={`w-6 h-6 ${
              rating <= displayValue
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-400 fill-none'
            } transition-colors`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-400">
        {displayValue > 0 ? `${displayValue}/10` : 'Rate this'}
      </span>
    </div>
  )
}
