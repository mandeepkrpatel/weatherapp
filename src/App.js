
import './App.css';
//import Uilreact from '@iconscout/react-unicons/icons/uil-react'
import Topbuttons from './components/topbuttons';
import Inputs from './components/Inputs';
import Timeandlocation from './components/Time and location';
import Temperatureanddetails from './components/Temperature';
//import Forecast from './components/forecast';
import getfotmattedweatherdata from './services/weatherservice';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [query,setquery] =useState({q: 'Japan'})
  const [units,setunits] = useState('metric')
  const [weather,setweather] = useState(null)
  useEffect(()=>{

    const fetchWeather = async () =>{
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);
     await getfotmattedweatherdata({...query, units}).then((data)=>{
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );

      setweather(data);
     });
    };
    fetchWeather();
  }, [query,units])
  const formatbackground = () =>{
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }
  
  return (
    <div className={`mx-auto max-w-screen-md mt-24 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatbackground()}`}>
      <Topbuttons setquery={setquery} />
      <Inputs setquery={setquery} units={units} setunits={setunits}/>
      {weather && (
        <div> 
          <Timeandlocation weather={weather}/>
          <Temperatureanddetails weather={weather}/>
          {/* <Forecast title="Hourly forecast" items={weather.hourly}/>
          <Forecast title="daily forecast" items={weather.daily}/> */}
        </div>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} /> 
    </div>
  );
}

export default App;
