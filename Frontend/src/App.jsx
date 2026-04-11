import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Signin from './pages/signin'
import Signup from './pages/signup'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
