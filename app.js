const apiKey="21bb028ecff2f13f18c4fe24fc488e6a";




var city=document.getElementById("city");
var datum=document.getElementById("datum");
var temperatura=document.getElementById("temp");
var icon=document.getElementById("icon");
var feel=document.getElementById("feel-like");
var humidity=document.getElementById("humidity");
var windspeed=document.getElementById("windspeed");
var pressure=document.getElementById("pressure");

document.getElementById("search").addEventListener("keypress", e=>{
    if(e.key=="Enter"){
        currentWeather(search.value);
     }
});


function currentWeather(cityName){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url).then((res)=>res.json()).then((data)=>{
        city.innerText=`${data.name}`;
        let now=new Date();
        datum.innerText=poveziDatum(now);
        temperatura.innerHTML=`${Math.round(data.main.temp)} <span>°C</span>`;
        icon.src=`http://openweathermap.org/img/w/${data.weather[0]["icon"]}.png`;
        feel.innerHTML=`Feels like: ${Math.round(data.main.feels_like)}<span>°C</span>`;
        humidity.innerText=`Humidity: ${data.main.humidity} %`;
        windspeed.innerText=`Wind speed: ${Math.round(data.wind.speed)} m/s`;
        pressure.innerText=`Pressure: ${data.main.pressure} hPa`;

    });
    document.getElementById("main").style.visibility="visible";
}



function poveziDatum(d){
    let dani=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let meseci=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let dan=dani[d.getDay()];
    let datum=d.getDate();
    let mesec=meseci[d.getMonth()];
    let god=d.getFullYear();
    return `${dan} ${datum} ${mesec} ${god}`;
}