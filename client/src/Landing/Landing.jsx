import React from 'react'
import { Link } from 'react-router-dom'
import config from '../utils/config.js'


const Landing = () => {
  return (
    <>
    <h1 className='text-red-500 text-4xl'>{config.APP_NAME}</h1>
    <div>Landing</div>
    <nav>
        <ul>
            
            <li><Link to="/studio">Studio</Link></li>
            <li><Link to="/photographer">Photographer</Link></li>
            <li><Link to="/printer">Printer</Link></li>
            <li><Link to="/customer">Customer</Link></li>
        </ul>
    </nav>
    </>
    
  )
}

export default Landing