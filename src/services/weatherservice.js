import {DateTime} from "luxon";
const API_KEY = "6c486f011a89faa91b88cc6680d6437a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getweatherData = (infotype,searchParams) =>{
    const url = new URL(BASE_URL + "/" + infotype);
    url.search = new URLSearchParams({ ...searchParams,appid:API_KEY});

    return fetch(url).then((res)=> res.json());
};

const formatcurrentweather = (data) =>{
    const {coord:{lat,lon}, main:{temp,feels_like,temp_min,temp_max,humidity},name,dt,sys:{country,sunrise,sunset},weather,wind:{speed},} = data || '' ;
    const {main:details,icon} =weather[0];
    return { lat,lon,temp,feels_like,temp_max,temp_min,humidity,name,dt,country,sunrise,sunset,details,icon,speed};
};
const formatforecastweather = (data) =>{
    let{ timezone, daily,hourly } = data || '' ;
    daily = daily?.slice(1, 6).map((d) =>{
        return{
            title: formattolocaltime(d.dt,timezone,'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });
    hourly = hourly?.slice(1, 6).map((d) =>{
        return{
            title: formattolocaltime(d.dt,timezone,'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        };
    });
    return {daily,hourly,timezone};
};
const getfotmattedweatherdata = async (searchParams) =>{
    const formattedcurrentweather = await getweatherData('weather', searchParams).then(formatcurrentweather);
    const { lat, 
            lon,
           } = formattedcurrentweather || '' ;
    const formattedforecastweather = await getweatherData('forecast',{lat,lon,  exclude: "current,minutely,alerts",
    units: searchParams.units}).then(formatforecastweather);
    return {...formattedcurrentweather, ...formattedforecastweather};
}
const formattolocaltime = (secs,zone,format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a" ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
const iconurlfromcode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`
export default getfotmattedweatherdata
export {formattolocaltime,iconurlfromcode} ;