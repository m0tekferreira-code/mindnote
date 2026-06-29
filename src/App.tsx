import { useState, useEffect } from 'react'
import { LandingPage } from './components/LandingPage'
import { AuthScreen } from './components/AuthScreen'
import { HomeScreen } from './components/HomeScreen'
import { getSession } from './lib/storage'
import type { User } from './lib/storage'

type Screen = 'landing' | 'auth' | 'app'

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = getSession()
    if (session) {
      setUser(session)
      setScreen('app')
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    )
  }

  if (screen === 'landing') {
    return <LandingPage onGetStarted={() => setScreen('auth')} />
  }

  if (screen === 'auth') {
    return (
      <AuthScreen
        onAuth={(u) => {
          setUser(u)
          setScreen('app')
        }}
      />
    )
  }

  return (
    <HomeScreen
      user={user!}
      onLogout={() => {
        setUser(null)
        setScreen('landing')
      }}
    />
  )
}

export default App
