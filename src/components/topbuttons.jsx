import React from 'react';

function Topbuttons({setquery}) {
    const cities=[
        {
            id:1,
            title:'India'

        },
        {
            id:2,
            title:'Spain'
            
        },
        {
            id:3,
            title:'London'
            
        },
        {
            id:4,
            title:'Italy'
            
        },
        {
            id:5,
            title:'Sydney'
            
        },
    ]
  return <div className="flex items-center justify-around my-6">
        {cities.map((city)=> (
            <button key={city.id} className="text-white text-lg font-medium" onClick={()=> setquery({q:city.title})}>{city.title}</button>
        ))}
    </div>
  
}

export default Topbuttons;