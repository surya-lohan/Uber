import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newCaptainData = {
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      vehicle: {
        capacity: vehicleCapacity,
        color: vehicleColor,
        plate: vehiclePlate,
        vehicleType: vehicleType
      }
    };

    setCaptainData(newCaptainData);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptainData);
      const data = response.data;
      console.log(data)
      setCaptain(data.captain)
      navigate('/home')
      alert(response.data.message)
    } catch (error) {
      console.log(error.response?.data?.message || error.message || error)
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setVehicleCapacity('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleType('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-28 -mt-8 -ml-4 ' src={Logo} alt="" />
        <form onSubmit={(e) => submitHandler(e)} >
          <h3 className='text-lg font-medium mb-2'>What is your name?</h3>
          <div className='flex gap-2 '>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className='bg-[#eeeeee] mb-7 w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base' type="text" required placeholder='First Name' />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='bg-[#eeeeee] mb-7 w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base' type="text" required placeholder='Last Name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>What is your email?</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" required placeholder='email@example.com' />
          <h3 className='text-lg font-medium'>Enter password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password' />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-2 mb-7'>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg' required>
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
            <input value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" required placeholder='Vehicle Color' />
          </div>
          <div className='flex gap-2 mb-7'>
            <input value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" required placeholder='Vehicle Plate' />
            <input value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' type="number" required placeholder='Vehicle Capacity' />
          </div>

          <button className='bg-[#111] mb-7 text-white font-semibold rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'>Sign Up</button>
          <p className='text-center'>Already have an account? <Link to={'/captain/login'} className='text-blue-700'>Login here</Link> </p>
        </form>
      </div>
      <div>
        <Link to={'/user/signup'} className='bg-[#d5622d] flex items-center justify-center mb-7 text-white font-semibold rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'>Sign Up as User</Link>
      </div>
    </div>
  )
}

export default CaptainSignup