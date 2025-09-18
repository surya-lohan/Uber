import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/Logo.png'
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptainData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, newCaptainData);
      const data = response.data;
      setCaptain(data.captain)
      navigate('/home')
    } catch (error) {

    }
    setEmail('');
    setPassword('');
  }

  return (

    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-28 -mt-8 -ml-4 ' src={Logo} alt="" />
        <form onSubmit={(e) => submitHandler(e)} >
          <h3 className='text-lg font-medium mb-2'>What is your email?</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" required placeholder='email@example.com' />
          <h3 className='text-lg font-medium'>Enter password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password' />
          <button className='bg-[#111] mb-7 text-white font-semibold rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'>Login</button>
          <p className='text-center'>Join a fleet? <Link to={'/captain/register'} className='text-blue-700'>Register as a Captain</Link> </p>
        </form>
      </div>
      <div>
        <Link to={'/user/login'} className='bg-[#d5622d] flex items-center justify-center mb-7 text-white font-semibold rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'>Sign In as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin