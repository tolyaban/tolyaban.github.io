var navCity;
var city;
var tdate= new Date();
tdate.setTime(tdate.getTime()+1000*60*60*24);
var lat;
var lon;

//var urlString ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=649ebf87a3e5c9d049e3eb54e4524e08";

var urlString;

navigator.geolocation.getCurrentPosition(function (position) {
    var lat = "lat=" + Math.round(position.coords.latitude);
    var lon = "lon=" + Math.round(position.coords.longitude);
    urlString ="https://api.openweathermap.org/data/2.5/forecast?" + lat + "&" + lon + "&mode=xml"+"&APPID=649ebf87a3e5c9d049e3eb54e4524e08"
    loadWeather();
    
    
});

document.getElementById("city").onkeypress =function (ev) {
    if (ev.keyCode==13) {
		 city = document.getElementById("city").value;
           if (city === "") {
        alert("Input town");
    }else{
        urlString ="https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&mode=xml"+"&APPID=649ebf87a3e5c9d049e3eb54e4524e08";
        loadWeather(); } 
    }
}

function  loadWeather() {
   console.log(urlString);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
    var j =0;
    if (xhr.readyState == 4 && xhr.status == 200) {
        var weatherData = xhr.responseXML;
        navCity = weatherData.getElementsByTagName('name')[0].innerHTML;
         document.getElementById("cityweather").innerText = "Weather in " + navCity;
        for (var i=0; i<8; i +=2){
            var d0 = "column-0-" + j;
            var d1 = "column-1-" + j;
            var d2 = "column-2-" + j;
            var d3 = "column-3-" + j;
            var d4 = "column-4-" + j;
            var d5 = "column-5-" + j;
            var d6 = "column-6-" + j;
            var d7 = "column-7-" + j;
            var d8 = "column-8-" + j;
            j +=1;
        var curentTime =   weatherData.getElementsByTagName('time')[i].getAttribute("from");
        ;
        document.getElementById(d0).innerText = (+(curentTime[11] + curentTime[12])+2) + ":00";
        var begin = '<img src="http://openweathermap.org/img/w/';
        var end = '.png" alt="">'
        document.getElementById(d1).innerHTML = begin+  weatherData.getElementsByTagName('symbol')[i].getAttribute("var")+ end ;
        //document.getElementById(d2).innerText = weatherData.getElementsByTagName('precipitation')[i].getAttribute("value");
        document.getElementById(d3).innerText = weatherData.getElementsByTagName('windDirection')[i].getAttribute("name");
        document.getElementById(d4).innerText = weatherData.getElementsByTagName('windSpeed')[i].getAttribute("name");
        document.getElementById(d5).innerText = Math.round(weatherData.getElementsByTagName('temperature')[i].getAttribute("value") - 273) ;

        document.getElementById(d6).innerText = weatherData.getElementsByTagName('pressure')[i].getAttribute("value");
        document.getElementById(d7).innerText = weatherData.getElementsByTagName('humidity')[i].getAttribute("value");
        document.getElementById(d8).innerText = weatherData.getElementsByTagName('clouds')[i].getAttribute("value");
        }
        j=0;
   //-----------------------------5days------------------------------------------------------
        for (var i=0; i<44; i +=8){
            var d0 = "col5Day-0-" + j;
            var d1 = "col5Day-1-" + j;
            var d2 = "col5Day-2-" + j;
            var d3 = "col5Day-3-" + j;
            var d4 = "col5Day-4-" + j;
            var d5 = "col5Day-5-" + j;
            var d6 = "col5Day-6-" + j;
            var d7 = "col5Day-7-" + j;
            var d8 = "col5Day-8-" + j;
            j +=1;
            var begin = '<img src="http://openweathermap.org/img/w/';
            var end = '.png" alt="">';
            
            document.getElementById(d1).innerHTML =begin +  weatherData.getElementsByTagName('symbol')[i].getAttribute("var")+ end ;
            var dateTime = weatherData.getElementsByTagName('time')[i].getAttribute("from").slice(0,10) +"\n" + ( + (weatherData.getElementsByTagName('time')[i].getAttribute("from").slice(11,12))+2)+ ":00";
            document.getElementById(d0).innerText =dateTime  /*"From " + weatherData.getElementsByTagName('time')[i].getAttribute("from") + " to " +weatherData.getElementsByTagName('time')[i].getAttribute("to")*/;

            document.getElementById(d3).innerText = weatherData.getElementsByTagName('windDirection')[i].getAttribute("name");
            document.getElementById(d4).innerText = weatherData.getElementsByTagName('windSpeed')[i].getAttribute("name");
            document.getElementById(d5).innerText = Math.round(weatherData.getElementsByTagName('temperature')[i].getAttribute("value") - 273) ;

            document.getElementById(d6).innerText = weatherData.getElementsByTagName('pressure')[i].getAttribute("value");
            document.getElementById(d7).innerText = weatherData.getElementsByTagName('humidity')[i].getAttribute("value");
            document.getElementById(d8).innerText = weatherData.getElementsByTagName('clouds')[i].getAttribute("value");
        }
      }
    }
    xhr.open('GET', urlString, true);
    xhr.send();
// --------------------------------------------XHR----------------------------------------------------------//

/*
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState ==4 && this.status == 200) {
 //           var obj = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = this.responseText;
          //  document.getElementById("cityWeather").innerHTML = obj.name;
          //  document.getElementById("temperature").innerHTML = obj.main.temp - 273) ;
          //  document.getElementById("weather").innerHTML = obj.weather[0].description;
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", urlString, true);
    xhttp.send();
    */
};
