import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare, Users, Settings, LogOut } from 'lucide-react'
import { SupabaseClient } from '@supabase/supabase-js'

interface SidebarProps {
  supabase: SupabaseClient
}

const Sidebar: React.FC<SidebarProps> = ({ supabase }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Creator Chat</h1>
      </div>
      <nav className="mt-8 flex-grow">
        <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-700">
          <MessageSquare className="mr-3" />
          Chat
        </Link>
        <Link to="/users" className="flex items-center px-4 py-2 hover:bg-gray-700">
          <Users className="mr-3" />
          Users
        </Link>
        <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-700">
          <Settings className="mr-3" />
          Settings
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 hover:bg-gray-700 mb-4"
      >
        <LogOut className="mr-3" />
        Logout
      </button>
    </div>
  )
}

export default Sidebar