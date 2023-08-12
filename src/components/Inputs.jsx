import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPinAlt } from '@iconscout/react-unicons'
import { toast } from "react-toastify";

function Inputs({setquery,units,setunits}) {
  const [city,setcity] = useState("");
  const handleSearchclick = ()=>{
    if (city !== '') setquery({q:city});
  };
  const handlelocationclick = () =>{
    if(navigator.geolocation){
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position)=>{
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setquery({
          lat,lon
        });
      })
    }
  }
  const handleunitchange = (e) =>{
    const selectedunit = e.currentTarget.name;
    if (units !== selectedunit) setunits(selectedunit);
  };
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input value={city} onChange={(e)=> setcity(e.currentTarget.value) } type='text' className='text-xl font-light p-2 w-full shadow-xl  focus:outline-none capitalize placeholder:lowercase' placeholder='search for city...'/>
            <UilSearch  onClick={handleSearchclick} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' />
            <UilLocationPinAlt onClick={handlelocationclick} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' />
        </div>
        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' onClick={handleunitchange} className='text-xl text-white font-light hover:scale-125 transition ease-out'> °C</button>
            <p className='text-xl text-white mx-1'>|</p>  
            <button name='imperial' onClick={handleunitchange} className='text-xl text-white font-light hover:scale-125 transition ease-out'>°F</button>
        </div>
    </div>
  )
}

export default Inputs