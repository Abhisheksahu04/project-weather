import React, { useEffect, useState, useRef } from 'react'
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import colud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState({});
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": clear_icon,
        "02n": clear_icon,
        "03d": clear_icon,
        "03n": clear_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
        
    }
    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            if (response.ok) {
                const icon = allIcons[data.weather[0].icon] || clear_icon;
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp - 273.15),
                    location: data.name,
                    icon: icon
                });
            } else {
                console.error(`Error: ${data.message}`);
            }
        } catch (error) {
            setWeatherData(false);
            console.error("Failed to fetch weather data:", error);
        }
    }

    useEffect(() => {
        search("New York");
    }, [])


  return (
    <div className='place-self-center p-10 rounded-[10px] bg-blue-500 flex flex-col items-center'>
      <div className='flex items-center gap-3'>
        <input 
            type="text" 
            placeholder='search' 
            ref={inputRef}
            className='h-12 border-none outline-none rounded-[40px] pl-6 text-gray-500 bg-[#ebfffc] text-[18px]' />
        <img 
            src={search_icon} 
            alt="search" 
            onClick={() => search(inputRef.current.value)}
            className='w-12 p-4 rounded-[50%] bg-slate-100 cursor-pointer' />
      </div>

      {weatherData?<>
        <img src={weatherData.icon} alt="wather icon" className='w-36 mx-0 my-8'/>
        <p className='text-[80px] text-white'>{weatherData.temperature}°C</p>
        <p className='text-white text-[40px]'>{weatherData.location}</p>

        <div className='w-full mt-10 text-white flex justify-between'>
            <div className='flex items-start gap-3 text-[22px]'>
                <img src={humidity_icon} alt="" className='w-7 mt-3' />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span className='block text-[16px]'>Humidity</span>
                </div>
            </div>

            <div className='flex items-start gap-3 text-[22px]'>
                <img src={wind_icon} alt="" className='w-7 mt-3'/>
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span className='block text-[16px]'>Wind Speed</span>
                </div>
            </div>
        </div>
      </> : <></>}

      
    </div>
  )
}

export default Weather;
