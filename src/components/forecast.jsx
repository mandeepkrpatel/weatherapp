import React from 'react'
import { iconurlfromcode } from '../services/weatherservice';

function Forecast({title,items}) {
    console.log(items);
  return (
    <div>
        <div className='flex items-center justify-center mt-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'/>
        <div className='flex flex-row items-center justify-between text-white'>
            {items?.map((item) =>(
                <div className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm'>
                    {item.title}
                </p>
                <img src={iconurlfromcode(item.icon)} alt='img' className='w-12 my-1'/>
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
            </div>

            ))}
            
        </div>
    </div>
  );
}

export default Forecast;