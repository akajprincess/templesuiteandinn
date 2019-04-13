let list = document.getElementsByTagName("title");
let weatherCode;
let jsonURLString;
let temple = list[0].innerText;
if("Salt Lake Temple" === temple) {
    weatherCode = 5604473;
    jsonURLString = "https://akajprincess.github.io/templesuiteandinn.github.io/json/saltlaketemple.json";
} else if ("Oquirrh Mountain Temple" === temple) {
    weatherCode = 5678757;
    jsonURLString = "https://akajprincess.github.io/templesuiteandinn.github.io/json/oquirrhmountaintemple.json";
} else if ("Monticello Temple" === temple) {
    weatherCode = 5678757;
    jsonURLString = "https://akajprincess.github.io/templesuiteandinn.github.io/json/monticellotemple.json";
} else if ("Los Angeles Temple" === temple) {
    weatherCode = 5678757;
    jsonURLString = "https://akajprincess.github.io/templesuiteandinn.github.io/json/losangelestemple.json";
} else {
    weatherCode = 5585010;
    jsonURLString = "https://akajprincess.github.io/templesuiteandinn.github.io/json/orlandotemple.json";
}
let templeInfoRequest = new XMLHttpRequest();
templeInfoRequest.open('Get', jsonURLString, true);
templeInfoRequest.send();

templeInfoRequest.onload = function() {
    let templeInfo = JSON.parse(templeInfoRequest.responseText);
    setTempleInfo(templeInfo)
}

function setTempleInfo(templeInfo) {
    let address = templeInfo.address
    document.getElementById("addressLine").innerHTML = address.line;
    document.getElementById("cityState").innerHTML = address.city + " " + address.state + " " + address.zip
    document.getElementById("country").innerHTML = address.country
    document.getElementById("phone").innerHTML = templeInfo.telephone

    var serviceList = document.getElementById("services");
    var services = templeInfo.services;
    for (var i = 0; i < services.length; i++) {
        var paragraph = document.createElement('p');
        paragraph.innerHTML = services[i];
        serviceList.appendChild(paragraph);
    }
    
    var historyList = document.getElementById("history");
    var histories = templeInfo.history;
    for (var j = 0; j < histories.length; j++) {
        var paragraph = document.createElement('p');
        paragraph.innerHTML = histories[j];
        historyList.appendChild(paragraph);
    }
    
    var closureList = document.getElementById("closures");
    var closures = templeInfo.closures;
    for (var k = 0; k < closures.length; k++) {
        var paragraph = document.createElement('p');
        paragraph.innerHTML = closures[k];
        closureList.appendChild(paragraph);
    }
    
    var ordinanceList = document.getElementById("ordinance");
    var ordinanceSchedule = templeInfo.ordinanceSchedule;
    for (var m = 0; m < ordinanceSchedule.length; m++) {
        var paragraph = document.createElement('p');
        paragraph.innerHTML = ordinanceSchedule[m];
        ordinanceList.appendChild(paragraph);
    }
    
    var sessionList = document.getElementById("session");
    var sessionSchedule = templeInfo.sessionSchedule;
    for (var n = 0; n < sessionSchedule.length; n++) {
        var paragraph = document.createElement('p');
        paragraph.innerHTML = sessionSchedule[n];
        sessionList.appendChild(paragraph);
    }
}

// let weatherRequest = new XMLHttpRequest();
// let apiURLstring = "https://api.openweathermap.org/data/2.5/weather?id=" + weatherCode + "&units=imperial&APPID=ce65a8d7c7b2b3226cf302518813322f"
// weatherRequest.open('Get', apiURLstring, true);
// weatherRequest.send();

weatherRequest.onload =  function () {
    let weatherData = JSON.parse(weatherRequest.responseText);
    console.log(weatherData);
    setWeatherData(town, weatherData);
}

function setWeatherData(town, weatherData) {
    let currentTemp = weatherData.main.temp;

    document.getElementById("current-temp").innerHTML = currentTemp.toFixed(2);

    let icon = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    let desc = weatherData.weather[0].description;
    let windspeed = weatherData.wind.speed;

    document.getElementById("weather-icon").setAttribute('src', icon);
    document.getElementById("weather-icon").setAttribute("alt", desc);
    document.getElementById("weather").innerHTML = weatherData.weather[0].main;
    document.getElementById("windspeed").innerHTML = windspeed.toFixed(2);
}