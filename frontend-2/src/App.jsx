import React from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/signup/signup'
import SignIn from './components/login/login'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
