let weather_APPID = "57bb166b9d62013062ce445763fb82e9" //openweathermap.org
let geoloc_APPID = "13e6b5cbd6ca2d36061f" //locationIQ

let icon
let temperature
let description
let weather

let city
let country
let lat
let lon


function getWeather() { 
    
    // get coordinates from user input location
    
    city = document.getElementById("city").value
    country = document.getElementById("country").value
    
    let geoloc_url = "http://locationiq.org/v1/search.php?key=" + geoloc_APPID + "&format=json" + "&city=" + city + "&country=" + country
    
    let geoloc_xhr = new XMLHttpRequest()
    geoloc_xhr.open("GET", geoloc_url, false)
    geoloc_xhr.send()
    
    let geoloc_data = JSON.parse(geoloc_xhr.responseText)
    
    lat = geoloc_data[0].lat
    lon = geoloc_data[0].lon
    
    // apply coordinates to get weather conditions
    
    let weather_url = "http://api.openweathermap.org/data/2.5/weather?" + "lon=" + lon + "&lat=" + lat + "&APPID=" + weather_APPID
    
    let weather_xhr = new XMLHttpRequest()
    weather_xhr.open("GET", weather_url, false)
    weather_xhr.send()
    
    let data = JSON.parse(weather_xhr.responseText)

    
    // icon list; icon determined by openweathermap.org's own image codes
    
    if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n" ){
        icon = "sun-1" //sunny
    }
    if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n" ){
        icon = "cloudy-1" //a little cloudy
    }
    if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n" ){
        icon = "cloudy" //scattered cloudy
    }
    if (data.weather[0].icon == "04d" || data.weather[0].icon == "04n" ){
        icon = "sky" //cloudy
    }
    if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n" ){
        icon = "rain-9" //pouring rain
    }
    if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n" ){
        icon = "rain-2" //rainy
    }
    if (data.weather[0].icon == "11d" || data.weather[0].icon == "11n" ){
        icon = "light-bolt-1" //thunderstorm
    }
    if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n" ){
        icon = "snowing" //snowing
    }
    if (data.weather[0].icon == "50d" || data.weather[0].icon == "50n" ){
        icon = "fogg" //foggy
    }
    
    
    // output
    
    document.getElementById("image").style = "width: 100px;"
    document.getElementById("image").src = "img/" + icon + ".png"
    document.getElementById("temperature").style = "font-size: 2rem; font-weight: bold;"
    document.getElementById("temperature").innerHTML = Number(data.main.temp-273.15).toFixed(2) + "&nbsp;&deg;C (" + Number(data.main.temp * (9/5) - 459.67).toFixed(2) + "&nbsp;&deg;F)"
    document.getElementById("weather").style = "font-size: 2rem; font-weight: bold;"
    document.getElementById("weather").innerHTML = data.weather[0].main
    document.getElementById("location").innerHTML = "The location is: " + data.name
    document.getElementById("description").innerHTML = "The weather is: " + data.weather[0].description
    
}



