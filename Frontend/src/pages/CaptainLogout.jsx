import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleLogout = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        return navigate('/captain/login');
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/captain/login');
          alert("Logged out succesfully!")
        }

      } catch (error) {
        localStorage.removeItem('token');
        console.log(error.message || error)
        navigate('/captain/login')
      }

    }
    handleLogout();
  },[navigate])
 
  return (
    <div>Logging out....</div>
  )
}

export default CaptainLogout