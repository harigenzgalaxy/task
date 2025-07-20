import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Studio from './Studio/Studio'
import Photographer from './Photographer/Photographer'
import Printer from './Printer/Printer'
import Customer from './Customer/Customer'
import Landing from './Landing/Landing'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/studio' element={<Studio />} />
        <Route path='/photographer' element={<Photographer />} />
        <Route path='/printer' element={<Printer />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
