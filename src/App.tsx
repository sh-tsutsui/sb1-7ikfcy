import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { createClient, Session } from '@supabase/supabase-js'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import Users from './components/Users'
import Settings from './components/Settings'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration. Please check your .env file.')
  throw new Error('Missing Supabase configuration. Please check your .env file.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {session && <Sidebar supabase={supabase} />}
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                session ? (
                  <Chat supabase={supabase} userId={session.user.id} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/users"
              element={
                session ? <Users /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/settings"
              element={
                session ? <Settings /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/login"
              element={
                !session ? (
                  <Login supabase={supabase} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App