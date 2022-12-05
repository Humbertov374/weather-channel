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