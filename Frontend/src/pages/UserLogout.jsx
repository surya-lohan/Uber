import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleLogout = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                localStorage.removeItem('token');
                navigate('/user/login');
                return;
            }
            
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/user/login');
                    alert("Logged out successfully!");
                }
            } catch (error) {
                console.log('Logout error:', error.response?.data || error.message);
                //agar logout server par fail bhi kar jata hai tab bhi localStorage se to remove hi kardo 
                localStorage.removeItem('token');
                navigate('/user/login');
            }
        };
        
        handleLogout();
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Logging out...</p>
        </div>
    )
}

export default UserLogout