/* 
http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key} 

*/
let inputField = document.getElementById("search")
let htmlContainer = document.querySelector("main")
let htmlCity = document.createElement("h2")
htmlCity.classList.add("city")
let htmlTemp = document.createElement("div")
htmlTemp.classList.add("Temp")
let htmlAuthor = document.createElement("div")
htmlAuthor.classList.add("author")
let latitude
let longitude
let city
let temperature
let author
let picture

async function submit(){
    inputField = document.getElementById("search").value
    let cooRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputField}&limit=1&appid=8aecc0a6e3f1adb9b4ca9a87e4db5cb6`)
    let cooObject = await cooRequest.json()
    latitude = cooObject[0].lat
    longitude = cooObject[0].lon
    getWeather()
}

async function getWeather(){
    let weaRequest = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=1&units=metric&lang=fr&appid=8aecc0a6e3f1adb9b4ca9a87e4db5cb6`)
    let weaObject = await weaRequest.json()
    city = weaObject.city.name
    temperature = weaObject.list[0].main.temp
    getImage()
}

async function getImage(){
    let imgRequest = await fetch (`https://api.unsplash.com/search/photos?query=${inputField}&orientation=landscape&per_page=5&client_id=t7OBdnBcNXemrBLnRVvtIsncn9UShFUv5Jph7fCnqdQ`)
    let imgObject = await imgRequest.json()
    console.log(imgObject)
    let randomNum = Math.floor(Math.random() * 5)
    console.log(randomNum)
    author = imgObject.results[randomNum].user.name
    picture = imgObject.results[randomNum].urls.regular
    createElem()
}

function createElem(){
    htmlCity.innerHTML = inputField
    htmlTemp.innerHTML = temperature
    htmlAuthor.innerHTML = author
    htmlContainer.appendChild(htmlCity)
    htmlContainer.appendChild(htmlTemp)
    htmlContainer.appendChild(htmlAuthor)
    document.body.style.backgroundImage = `url('${picture}')`
}