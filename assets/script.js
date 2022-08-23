/* 
http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key} 

*/
let inputField = document.getElementById("search")
let htmlHeader = document.querySelector("header")
let htmlTopLeft = document.querySelector(".top--left")
let htmlFooter = document.querySelector("footer")
let htmlCity = document.createElement("h3")
let htmlTemp = document.createElement("div")
let htmlWeather = document.createElement("div")
let htmlBotLeft = document.querySelector(".bot--left")
let htmlBotMiddle = document.querySelector(".bot--middle")
let htmlBotRight = document.querySelector(".bot--right")
let htmlHumidityIcon = document.createElement("img")
let htmlHumidity = document.createElement("div")
let htmlWind = document.createElement("div")
let htmlWindIcon = document.createElement("img")
let htmlWeatherIcon = document.createElement("img")
let htmlDescription = document.createElement("div")
let htmlSearch = document.querySelector("input")

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
let colorCheck

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
    temperature = weaObject.list[0].main.temp
    weather = weaObject.list[0].weather[0].main
    weaIcon = weaObject.list[0].weather[0].icon
    description = weaObject.list[0].weather[0].description
    humidity = weaObject.list[0].main.humidity
    wind = weaObject.list[0].wind.speed
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
    htmlHumidityIcon.setAttribute("src", "./assets/img/humidity.png")
    htmlHumidityIcon.classList.add("humidityIcon")
    htmlHumidity.innerHTML = `${humidity}%`
    htmlHumidity.classList.add("humidity")
    htmlWindIcon.setAttribute("src", "./assets/img/storm.png")
    htmlWindIcon.classList.add("windIcon")
    htmlWind.innerHTML = `${wind}m/s`
    htmlWind.classList.add("wind")
    htmlWeatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weaIcon}@2x.png`)
    htmlWeatherIcon.classList.add("weaIcon")
    htmlDescription.innerHTML = description
    htmlDescription.classList.add("description")
    htmlSearch.style.backgroundColor = color


    htmlTopLeft.appendChild(htmlCity)
    htmlTopLeft.appendChild(htmlTemp)
    document.querySelector(".top").appendChild(htmlWeather)
    htmlBotLeft.appendChild(htmlWindIcon)
    htmlBotLeft.appendChild(htmlWind)
    htmlBotMiddle.appendChild(htmlWeatherIcon)
    htmlBotMiddle.appendChild(htmlDescription)
    htmlBotRight.appendChild(htmlHumidityIcon)
    htmlBotRight.appendChild(htmlHumidity)

    
    let tryColor = `linear-gradient(0.25turn, ${hexToRGB(color, 1)}, ${hexToRGB(color, 0.1)}, ${hexToRGB(color, 1)})`

    SwapColorFont(colorCheck)
    
    document.querySelector(".top").style.background = tryColor
    document.querySelector(".bot").style.background = tryColor
    document.querySelector("footer").style.background = tryColor

    document.body.style.backgroundImage = `url('${picture}')`

    // "linear-gradient(0.25turn, rgba(" + color + ", $alpha: 0.7), rgba(" + color + ", $alpha: 0.1), rgba(" + color + ", $alpha: 0.7)"
}

function SwapColorFont(value){
    if (value > 600) {
        htmlCity.style.color = "#252525"
        htmlTemp.style.color = "#252525"
        htmlWeather.style.color = "#252525"
        htmlHumidity.style.color = "#252525"
        htmlWind.style.color = "#252525"
        htmlDescription.style.color = "#252525"
        htmlSearch.style.color = "#252525"
    }
    else{
        htmlCity.style.color = "#e5e5e5"
        htmlTemp.style.color = "#e5e5e5"
        htmlWeather.style.color = "#e5e5e5"
        htmlHumidity.style.color = "#e5e5e5"
        htmlWind.style.color = "#e5e5e5"
        htmlDescription.style.color = "#e5e5e5"
        htmlSearch.style.color = "#e5e5e5"
    }
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
        colorCheck = r + g + b

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}