/* 
http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key} 

*/
let inputField = document.getElementById("search")
let htmlHeader = document.querySelector("header")
let htmlTopLeft = document.querySelector(".top--left")
let htmlTopRight = document.querySelector(".top--right")
let htmlFooter = document.querySelector("footer")
let htmlCity = document.createElement("h3")
let htmlTemp = document.createElement("div")
let htmlWeather = document.createElement("div")
let htmlBotLeft = document.querySelector(".bot--left")
let htmlBotRight = document.querySelector(".bot--right")
let htmlHumidity = document.createElement("div")
let htmlWind = document.createElement("div")
let htmlWeatherIcon = document.createElement("img")
let htmlDescription = document.createElement("div")


let latitude
let longitude
let city
let temperature
let weather
let picture
let color
let humidity 
let wind
let weaIcon
let description

inputField.addEventListener("keyup", function(event){
    if (event.key === "Enter") {
        submit()
    }
})

async function submit(){
    inputField = document.getElementById("search").value
    let cooRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputField}&limit=1&appid=8aecc0a6e3f1adb9b4ca9a87e4db5cb6`)
    let cooObject = await cooRequest.json()
    latitude = cooObject[0].lat
    longitude = cooObject[0].lon
    getWeather()
}

async function getWeather(){
    let weaRequest = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=1&units=metric&appid=8aecc0a6e3f1adb9b4ca9a87e4db5cb6`)
    let weaObject = await weaRequest.json()
    console.log(weaObject)
    temperature = weaObject.list[0].main.temp
    weather = weaObject.list[0].weather[0].main
    weaIcon = weaObject.list[0].weather[0].icon
    description = weaObject.list[0].weather[0].description
    humidity = weaObject.list[0].main.humidity
    wind = weaObject.list[0].wind.speed
    console.log(weaIcon)
    getImage()
}

async function getImage(){
    let imgRequest = await fetch (`https://api.unsplash.com/search/photos?query=${inputField}&orientation=landscape&per_page=5&client_id=t7OBdnBcNXemrBLnRVvtIsncn9UShFUv5Jph7fCnqdQ`)
    let imgObject = await imgRequest.json()
    let randomNum = Math.floor(Math.random() * 5)
    picture = imgObject.results[randomNum].urls.regular
    color = imgObject.results[randomNum].color
    createElem()
}

function createElem(){
    htmlCity.innerHTML = inputField
    htmlCity.classList.add("city")
    htmlTemp.innerHTML = `${Math.floor(temperature)}°`
    htmlTemp.classList.add("temp")
    htmlWeather.innerHTML = weather
    htmlWeather.classList.add("weather")
    console.log(humidity)
    htmlHumidity.innerHTML = `Humidity : ${humidity}%`
    htmlHumidity.classList.add("humidity")
    htmlWind.innerHTML = `Wind speed : ${wind}m/s`
    htmlWind.classList.add("wind")
    htmlWeatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weaIcon}@2x.png`)
    htmlWeatherIcon.classList.add("weaIcon")
    htmlDescription.innerHTML = description
    htmlDescription.classList.add("description")

    htmlTopLeft.appendChild(htmlCity)
    htmlTopLeft.appendChild(htmlTemp)
    htmlTopRight.appendChild(htmlWeather)
    htmlBotLeft.appendChild(htmlHumidity)
    htmlBotLeft.appendChild(htmlWind)
    htmlBotRight.appendChild(htmlWeatherIcon)
    htmlBotRight.appendChild(htmlDescription)
    

    
    document.querySelector(".top").style.backgroundColor = color
    document.querySelector(".bot").style.backgroundColor = color
    document.querySelector("footer").style.backgroundColor = color

    document.body.style.backgroundImage = `url('${picture}')`

    // "linear-gradient(0.25turn, rgba(" + color + ", $alpha: 0.7), rgba(" + color + ", $alpha: 0.1), rgba(" + color + ", $alpha: 0.7)"
    // linear-gradient(0.25turn, rgba(${color}, $alpha: 0.7), rgba(${color}, $alpha: 0.1),rgba(${color}, $alpha: 0.7));
}