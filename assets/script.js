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
let htmlAuthor = document.createElement("div")
let htmlWeather = document.createElement("div")

let latitude
let longitude
let city
let temperature
let weather
let author
let picture
let color

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
    console.log(weather)
    getImage()
}

async function getImage(){
    let imgRequest = await fetch (`https://api.unsplash.com/search/photos?query=${inputField}&orientation=landscape&per_page=5&client_id=t7OBdnBcNXemrBLnRVvtIsncn9UShFUv5Jph7fCnqdQ`)
    let imgObject = await imgRequest.json()
    let randomNum = Math.floor(Math.random() * 5)
    author = imgObject.results[randomNum].user.name
    picture = imgObject.results[randomNum].urls.regular
    color = imgObject.results[randomNum].color
    createElem()
    console.log(imgObject.results[randomNum])

}

function createElem(){
    htmlCity.innerHTML = inputField
    htmlCity.classList.add("city")
    htmlTemp.innerHTML = `${Math.floor(temperature)}°`
    htmlTemp.classList.add("temp")
    htmlWeather.innerHTML = weather
    htmlWeather.classList.add("weather")
    htmlAuthor.innerHTML = author
    htmlAuthor.classList.add("author")
    htmlTopLeft.appendChild(htmlCity)
    htmlTopLeft.appendChild(htmlTemp)
    htmlTopRight.appendChild(htmlWeather)
    htmlHeader.appendChild(htmlAuthor)
    document.body.style.backgroundImage = `url('${picture}')`
    console.log(color)
    document.querySelector(".top").style.backgroundColor = color
    // "linear-gradient(0.25turn, rgba(" + color + ", $alpha: 0.7), rgba(" + color + ", $alpha: 0.1), rgba(" + color + ", $alpha: 0.7)"
    // linear-gradient(0.25turn, rgba(${color}, $alpha: 0.7), rgba(${color}, $alpha: 0.1),rgba(${color}, $alpha: 0.7));
}