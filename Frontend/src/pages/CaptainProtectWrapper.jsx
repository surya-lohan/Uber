import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {CaptainDataContext} from '../context/CaptainContext'
const CaptainProtectWrapper = ({children}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {captain , setCaptain} = useContext(CaptainDataContext)
    const [isLoading , setIsLoading] = useState(true);
    useEffect(()=> {
        
        if (!token) {
            navigate('/captain/login')
        }
    },[token]);

    useEffect(() => {
        if (!token) return;
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain);
                setIsLoading(false);
            }
        }).catch(error => {
            console.log(error);
            console.log(token);
            localStorage.removeItem('token');
            setIsLoading(false)
            navigate('/captain/login');
        });
    }, [token]);

    if (isLoading) {
        return (
            <div>
                Loading....
            </div>
        )
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default CaptainProtectWrapper