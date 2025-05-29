import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({})
    }

  return (

    /* Navbar */
<div className='flex items-center justify-between py-4 font-medium px-6 shadow-md bg-white'>

{/* Logo */}
<Link to='/'>< img src={assets.logo} className='w-36 cursor-pointer transition-transform duration-200 hover:scale-105' alt="" /></Link>

{/* Navigation */}
<ul className='hidden sm:flex gap-6 text-sm text-gray-800'>
    <NavLink to='/' className='flex flex-col items-center gap-1 group'>
        <p className='group-hover:text-purple-700 transition-colors duration-300'>HOME</p>
        <hr className='w-2/4 h-[2px] bg-purple-700 hidden group-hover:block transition-all duration-500' />
    </NavLink>
    <NavLink to='/customize' className='flex flex-col items-center gap-1 group'>
        <p className='group-hover:text-purple-700 transition-colors duration-300'>CUSTOMIZE</p>
        <hr className='w-2/4 h-[2px] bg-purple-700 hidden group-hover:block transition-all duration-500' />
    </NavLink>
    <NavLink to='/collection' className='flex flex-col items-center gap-1 group'>
        <p className='group-hover:text-purple-700 transition-colors duration-300'>COLLECTION</p>
        <hr className='w-2/4 h-[2px] bg-purple-700 hidden group-hover:block transition-all duration-500' />
    </NavLink>
    <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
        <p className='group-hover:text-purple-700 transition-colors duration-300'>ABOUT</p>
        <hr className='w-2/4 h-[2px] bg-purple-700 hidden group-hover:block transition-all duration-500' />
    </NavLink>
    <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
        <p className='group-hover:text-purple-700 transition-colors duration-300'>CONTACT</p>
        <hr className='w-2/4 h-[2px] bg-purple-700 hidden group-hover:block transition-all duration-500' />
    </NavLink>
</ul>

{/* Icons Section */}
<div className='flex items-center gap-6'>
    <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-4 cursor-pointer hover:scale-110 transition-transform duration-200' alt="" />

    {/* Profile Dropdown */}
    <div className='relative group'>
        
        <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-6 cursor-pointer' alt="" />
        {token &&  <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            {/* Dropdown  */}
            <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-gray-200 text-gray-700 rounded shadow-xl transition-all duration-500'>
                <p className='cursor-pointer hover:text-black transition-colors duration-300'>My Profile</p>
                <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black transition-colors duration-300'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black transition-colors duration-300'>Logout</p>
            </div>
        </div>}
    </div>

    {/* Cart Icon */}
    <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className='w-7 min-w-7 hover:scale-110 transition-transform duration-300' alt="" />
        <p className='absolute right-[-5px] w-4 text-center leading-4 bg-purple-700 text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
    </Link>

    {/* Mobile Menu Icon */}
    <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-8 cursor-pointer sm:hidden hover:scale-110 transition-transform duration-300' alt="" />
</div>

{/* Sidebar for Mobile */}
<div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-500 ease-in-out shadow-xl ${visible ? 'w-3/4 sm:w-2/5' : 'w-0'}`}>
    <div className='flex flex-col text-gray-800'>
        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p className='font-semibold'>Back</p>
        </div>
        <NavLink className='py-3 pl-6 border-b hover:bg-gray-200 transition-colors duration-200' to='/'>HOME</NavLink>
        <NavLink className='py-3 pl-6 border-b hover:bg-gray-200 transition-colors duration-200' to='/collection'>COLLECTION</NavLink>
        <NavLink className='py-3 pl-6 border-b hover:bg-gray-200 transition-colors duration-200' to='/about'>ABOUT</NavLink>
        <NavLink className='py-3 pl-6 border-b hover:bg-gray-200 transition-colors duration-200' to='/contact'>CONTACT</NavLink>
    </div>
</div>
</div>
  )
}

export default Navbar

