import React from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const NavBar = ({setToken}) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  }
  return (
    <div>
    <div className='flex items-center py-2 px-[4%] justify-between bg-white shadow-sm'>
      {/* Logo with tint on hover */}
      <img 
      onClick={handleLogoClick}
        src={assets.logo} 
        alt="Logo" 
        className='w-[max(10%,80px)] cursor-pointer transition-transform duration-300 hover:scale-105 hover:brightness-110' 
      />

      {/* Logout Button with gradient + hover effect */}
     <button onClick={() => setToken('')} className='bg-gradient-to-r from-indigo-800 via-purple-800 to-gray-900 text-white px-6 py-2 rounded-full shadow-lg hover:scale-120 hover:shadow-xl transition-all duration-700'>
  Logout
</button>

    </div>
    
    </div>
  )
}

export default NavBar
