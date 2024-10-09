import React, { useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  supabase: SupabaseClient
}

const Login: React.FC<LoginProps> = ({ supabase }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegistering) {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) {
        console.error('Error registering:', error)
      } else {
        alert('Registration successful! Please check your email to verify your account.')
        setIsRegistering(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        console.error('Error logging in:', error)
      } else {
        navigate('/')
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <form onSubmit={handleAuth} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
        >
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </form>
    </div>
  )
}

export default Login