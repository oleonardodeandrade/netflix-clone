type SkipIntroButtonProps = {
  onClick: () => void
  visible: boolean
}

export function SkipIntroButton({ onClick, visible }: SkipIntroButtonProps) {
  if (!visible) return null

  return (
    <button
      onClick={onClick}
      className="absolute bottom-28 right-8 z-50 flex items-center gap-2 px-6 py-2 bg-transparent border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200"
    >
      <span>Skip Intro</span>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </button>
  )
}
