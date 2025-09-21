import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
const UserProtectWrapper = ({
    children
}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading , setIsLoading] = useState(true);
    const {user , setUser} = useContext(UserDataContext);

    useEffect(() => {
        if (!token) {
            navigate('/user/login')
        }
    },[token])

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status ===200) {
      setUser(response.data.user)
      setIsLoading(false)
      }
    }) .catch(error => {
      console.log(error);
      localStorage.removeItem('token');
    })
    }, [token]);

   if (isLoading) {
    return (
      <div>
        Loading....
      </div>
    )
   }
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectWrapper