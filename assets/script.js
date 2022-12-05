//Hides elements that will show once the first search goes through.
$(".current-box").hide();
$(".forecast-banner").hide();
var forecastdisplay;

//Pulls previous city searches from local storage.
function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]));
    }
    for (j = 0; j < values.length; j++) {
        $(".prev-list").prepend("<button class='prev-city mt-1'>" + values[j] + "</button>");
    }
}
allStorage();

//Clears all local storage items and previous searches from the page.
$(".clear").on("click", function() {
    localStorage.clear();
    $(".prev-city").remove();
});

//This function collects all the info from the weather APIs to display on the page
$(".search").on("click", function() {
    var subject = $(".subject").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=3c34658c8e0e9fdb71064b81293a3704";
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + subject + "&appid=3c34658c8e0e9fdb71064b81293a3704";
    var lat;
    var lon;
    if (forecastdisplay === true) {
        $(".forecast-day").remove();
        forecastdisplay = false;
    }

//This first ajax request collects current weather data and converts info into what we want to display.
    $.ajax({
        url: queryURL,
        method: "GET",
        statusCode: {
            404: function() {
              return;
            }
          }    
    }).then(function(response){
        console.log(response);
        $(".prev-list").prepend("<button class='prev-city mt-1'>" + subject + "</button>");
        localStorage.setItem(subject, subject);
        $(".current-box").show();
        $(".forecast-banner").show();
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $(".icon").attr('src', iconurl)
        lat = response.coord.lat;
        lon = response.coord.lon;
        $(".current-city").text(response.name + " " + moment().format('l'));
        var currentTemp = response.main.temp * (9/5) - 459.67;
        $(".current-temp").text("Temperature: " + currentTemp.toFixed(1) + " °F");
        $(".current-hum").text("Humidity: " + response.main.humidity + "%");
        $(".current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=3c34658c8e0e9fdb71064b81293a3704&lat=" + lat + "&lon=" + lon;
//This is nested ajax request that gets the UV index but uses longitude and latitude from the previous ajax request to do so.
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            $(".current-uv").text("UV Index: " + response[0].value);
        })
    })