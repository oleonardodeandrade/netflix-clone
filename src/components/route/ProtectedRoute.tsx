import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import { useAtomValue } from 'jotai'
import { currentProfileAtom } from '../../store/profiles'

interface ProtectedRouteProps {
  children: ReactNode
  requireProfile?: boolean
}

export function ProtectedRoute({ children, requireProfile = true }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useUser()
  const currentProfile = useAtomValue(currentProfileAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      navigate('/login', { replace: true })
      return
    }

    if (requireProfile && !currentProfile) {
      navigate('/profiles', { replace: true })
    }
  }, [isLoaded, isSignedIn, currentProfile, requireProfile, navigate])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading</div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  if (requireProfile && !currentProfile) {
    return null
  }

  return <>{children}</>
}
