import React,{useState} from 'react'
import './weatherapp.css'

import cloud from '../assets/cloud.png'
import clear from '../assets/clear.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import searchicon from '../assets/search.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const WeatherApp = () => {

  const [cityname, setcityname] = useState('London');
  const [icon, seticon] = useState(cloud);
  const APIkey = '59c65d0201d5c9a85b98b10edc2e241f';

  const search = (val)=>{
      setcityname(val);
   
  }

  const fetchWeather = async ()=>{
    const element = document.getElementsByClassName('cityInput')
    if(element[0].value===''){
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`;

    let resp = await fetch(url);
    let data = await resp.json();

    const humidity_data = document.getElementsByClassName('humidity-per');
    const temperature = document.getElementsByClassName('weather-temp');
    const wind_data = document.getElementsByClassName('wind-per');
    const location = document.getElementsByClassName('weather-location');

    humidity_data[0].innerHTML = data.main.humidity + "%";
    temperature[0].innerHTML = data.main.temp + " c";
    wind_data[0].innerHTML = data.wind.speed + "%";
    location[0].innerHTML = data.name;

    // console.log(data.name);
    if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
        seticon(clear)
        }else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
          seticon(cloud)
          }else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
            seticon(clear)
        }else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
          seticon(drizzle)
        }else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
          seticon(rain)
      }else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
        seticon(rain)
    }else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
      seticon(snow)
    }else{
      seticon(clear)
    }

  }


  return (
    <div className='container'>
        <div className="topbar">
            
        <input type='text' className='cityInput' onChange={(e)=>search(e.target.value)}  placeholder='Enter City'></input>
            <div className="searchbar">
                <img src={searchicon} alt="searchimg" onClick={fetchWeather} />
            </div>
        </div>
        <div className="weatherimg">
          <img src={icon} alt="" />
        </div>
        <div className="weather-temp">45^c</div>
        <div className="weather-location">Delhi</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity} alt="" />
            <div className="data">
               <div className="humidity-per">45%</div>
                <div className="humidity-text">Humidity</div>
            </div>
           
          </div>
          <div className="element">
            <img src={wind} alt="" />
            <div className="data">
              <div className="wind-per">80%</div>
            <div className="humidity-text">Wind</div>
            </div>
            
          </div>
        </div>

    </div>
  )
}

export default WeatherApp