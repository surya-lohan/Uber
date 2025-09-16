import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'

const App = () => {
  return (
    <div >
        <Routes>
            <Route path='/' element={<Start/>}/>
            <Route path='/user/login' element={<UserLogin/>}/>
            <Route path='/user/register' element={<UserSignup/>}/>
            <Route path='/captain/login' element={<CaptainLogin/>}/>
            <Route path='/captain/register' element={<CaptainSignup/>}/>
            <Route path='/home' element={<Home />}/>
        </Routes>
    </div>
  )
}
export default App