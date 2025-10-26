import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-red-600">Netflix Clone</h1>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main className="p-8">
        <SignedOut>
          <div className="text-center mt-20">
            <h2 className="text-5xl font-bold mb-4">Welcome to Netflix Clone</h2>
            <p className="text-gray-400 text-xl mb-8">Sign in to start watching</p>
          </div>
        </SignedOut>

        <SignedIn>
          <h2 className="text-4xl font-bold mb-6">Welcome back!</h2>
          <p className="text-gray-400">Your personalized content will appear here</p>
        </SignedIn>
      </main>
    </div>
  )
}
