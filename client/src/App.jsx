import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Studio from './Studio/Studio'
import Photographer from './Photographer/Photographer'
import Printer from './Printer/Printer'
import Customer from './Customer/Customer'
import Landing from './Landing/Landing'
import HomePage from './Photographer/Index'
import Sidebar from './Studio/components/Sidebar'
import ProfileView from './Photographer/components/ProfileView'
import EventDetails from './Photographer/components/ViewEvent'
import { Home } from 'lucide-react'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/studio' element={<Studio />} />
        <Route path='/photographer' element={<HomePage />} />
        <Route path='/printer' element={<Printer />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/photohome' element={<HomePage />} />
        <Route path='/studiohome' element={<Studio />} />
        <Route path='/events/:id' element={<EventDetails/>} />
        <Route path='/test' element={<ProfileView />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
