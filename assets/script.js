/* 
http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key} 

*/
let inputField = document.getElementById("search")
let htmlContainer = document.querySelector("main")
let htmlCity = document.createElement("h2")
let htmlTemp = document.createElement("div")
let latitude
let longitude
let city
let temperature

async function submit(){
    inputField = document.getElementById("search").value
    let cooRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputField}&limit=1&appid=8aecc0a6e3f1adb9b4ca9a87e4db5cb6`)
    let cooObject = await cooRequest.json()
    latitude = cooObject[0].lat
    longitude = cooObject[0].lon
    getWeather()
    // console.log(cooObject)
}

async function getWeather(){
    console.log(`${inputField} a une latitude de ${latitude}° et une longitude de ${longitude}°`)
    let weaRequest = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=1&units=metric&lang=fr&appid=8aecc0a6e3f1adb9b4ca9a87e4db5cb6`)
    let weaObject = await weaRequest.json()
    console.log(weaObject)
    city = weaObject.city.name
    temperature = weaObject.list[0].main.temp
    console.table(city)
    console.table(weaObject.list[0].main.temp)
    createElem()
}

function createElem(){

    htmlCity.innerHTML = inputField
    htmlTemp.innerHTML = temperature
    htmlContainer.appendChild(htmlCity)
    htmlContainer.appendChild(htmlTemp)
}

function check(){
    console.log(latitude)
    console.log(temperature)
}