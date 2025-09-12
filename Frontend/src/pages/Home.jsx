import React from 'react'
import { Link, Routes } from 'react-router-dom'
import Logo from '../assets/Logo.png';
import Image from '../assets/image.png';

const Home = () => {
  return (
    <div>
        <div
          className='bg-contain h-screen flex justify-between flex-col w-full'
          style={{ backgroundImage: `url(${Image})` }}
        >
          <img className='w-28 ml-2' src={Logo} alt=""  />
          <div className='bg-white py-3 px-4'>
            <h2 className='text-3xl pb-6 font-bold'>Get Started with SuryaX</h2>
            <Link to={'/user/login'} className=' flex items-center justify-center w-full bg-black text-white py-3 mb-2 rounded mt-5'>Continue</Link>
          </div>
        </div>
    </div>
  )
}

export default Home