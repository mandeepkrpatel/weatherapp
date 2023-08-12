import React from 'react'
import { formattolocaltime } from '../services/weatherservice'

function Timeandlocation({weather : {dt,timezone,name,country}}) {
  return <div>
    <div className='flex items-center justify-center my-6'>
        
            <p className='text-white text-xl font-extralight'> {formattolocaltime(dt,timezone)}</p>
        
    </div>
    <div className='flex items-center justify-center my-3'>
        <p className='text-white text-xl font-medium'>{`${name}, ${country}`}</p>

    </div>
  </div>
  
}

export default Timeandlocation;