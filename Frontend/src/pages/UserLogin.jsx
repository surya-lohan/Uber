import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
const UserLogin = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [userData , setUserData] = useState({}); 
  const submitHandler = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setUserData({
      email: email,
      password: password
    })
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-28 -mt-8 -ml-4 ' src={Logo} alt=""  />
      <form onSubmit={(e) => submitHandler(e)} >
        <h3 className='text-lg font-medium mb-2'>What is your email?</h3>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" required placeholder='email@example.com' />
        <h3 className='text-lg font-medium'>Enter password</h3>
        <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password'/>
        <button className='bg-[#111] mb-7 text-white font-semibold rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center'>New here? <Link to={'/user/register'} className='text-blue-700'>Create new account</Link> </p>
      </form>
      </div>
      <div>
        <Link to={'/captain/login'} className='bg-[#10B461] flex items-center justify-center mb-7 text-white font-semibold rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'>Sign In as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin