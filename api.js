let btn=document.getElementById('search');
const place=document.getElementById('place');
const img=document.getElementById('img');
const date=document.getElementById('date');
const humidity=document.getElementById('humidity');
const temp=document.getElementById('temp');
const feel=document.getElementById('feel');
const pressure=document.getElementById('pressure');
const wind=document.getElementById('wind');

const btn2=document.getElementById('alocate');
btn2.addEventListener('click',getlanlat);


console.log("0");
btn.addEventListener("click" , myFunction)
console.log("0.1");
async function myFunction()
{
    const place=document.getElementById('answer1').value;
    console.log("1");
    console.log(place.toString());
    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=4bb99324df92fb3d3adc317a1bba30ec&units=metric`)
    const js=await res.json();

    console.log(js)
    place.innerHTML=`${js.main.name}`

    console.log("2");

    if(js.cod=="400")
    {
        alert(`${location} not Found`);
    }
    else
    {
        const dt=new Date(1604490871*1000)
        date.innerText=`${dt.getDate()} ${dt.getMonth()},${dt.getUTCFullYear()}`
        humidity.innerHTML=`Humidity :${js.main.humidity} %`
        temp.innerHTML=`temp : ${js.main.temp} C`
        feel.innerHTML=`Feels Like : ${js.main.feels_like} C`
        pressure.innerHTML=`Pressure : ${js.main.pressure} hpa`   
        wind.innerHTML=`Wind Speed : ${js.wind.speed} m/s`

        const imgres=await fetch(`https://openweathermap.org/img/wn/${js.weather[0].icon}@2x.png`);
        const imgdata=await imgres.blob();
        img.src=URL.createObjectURL(imgdata);
    }
}

console.log("3");

function getlanlat()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getlocationdata);
    }
    else
    {
        alert("Browser does not support location system");
    }
}

async function getlocationdata(position)
{
    const lat=position.coords.latitude.toFixed(2);
    const lon=position.coords.longitude.toFixed(2);

    console.log(lat);
    console.log(lon);

    const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4bb99324df92fb3d3adc317a1bba30ec&units=metric`)
    const js= await res.json()

    console.log(js)

    const dt=new Date(1604490871*1000)
        date.innerText=`${dt.getDate()} ${dt.getMonth()},${dt.getUTCFullYear()}`
        humidity.innerHTML=`Humidity :${js.main.humidity} %`
        temp.innerHTML=`temp : ${js.main.temp} °C`
        feel.innerHTML=`Feels Like : ${js.main.feels_like} °C`
        pressure.innerHTML=`Pressure : ${js.main.pressure} hpa`   
        wind.innerHTML=`Wind Speed : ${js.wind.speed} m/s`

        const imgres=await fetch(`https://openweathermap.org/img/wn/${js.weather[0].icon}@2x.png`);
        const imgdata=await imgres.blob();
        img.src=URL.createObjectURL(imgdata);
    
}