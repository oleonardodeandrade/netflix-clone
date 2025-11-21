import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react'

export default function Login() {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/profiles', { replace: true })
    }
  }, [isSignedIn, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/1fd8c6d0-20db-4667-860e-dd1ad7353ac0/10f8d166-7c8c-499a-b16f-57c3740cdeae/US-en-20240624-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center opacity-50"></div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-black/75 backdrop-blur-md rounded-lg p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-2">NETFLIX</h1>
            <p className="text-gray-300 text-lg">Unlimited movies, TV shows, and more</p>
          </div>

          <div className="space-y-4">
            <SignInButton mode="modal">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-200">
                Sign In
              </button>
            </SignInButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/75 text-gray-400">OR</span>
              </div>
            </div>

            <SignUpButton mode="modal">
              <button className="w-full bg-transparent border-2 border-gray-500 hover:border-gray-400 text-white font-semibold py-3 px-6 rounded transition-colors duration-200">
                Create Account
              </button>
            </SignUpButton>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>This is a demo project. No real payment required.</p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Made with ❤️ for learning purposes</p>
        </div>
      </div>
    </div>
  )
}
