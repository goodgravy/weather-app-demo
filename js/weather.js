window.forge.enableDebug();

var geolocation = {
	"lat": "37.776289",
	"lon": "-122.395234"
};

var forecast = [
	{
		"period": 0,
		"icon": "partlycloudy",
		"icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
		"title": "Thursday",
		"fcttext": "Mostly cloudy with a chance of a thunderstorm and a chance of rain."
	},
	{
		"period": 1,
		"icon": "mostlycloudy",
		"icon_url": "http://icons-ak.wxug.com/i/c/k/mostlycloudy.gif",
		"title": "Thursday Night",
		"fcttext": "Mostly cloudy. Fog overnight."
	},
	{
		"period": 2,
		"icon": "partlycloudy",
		"icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
		"title": "Friday",
		"fcttext": "Mostly cloudy in the morning, then partly cloudy."
	}
];

forge.logging.info(JSON.stringify(forecast));

function showForecast (forecastData) {
	forge.logging.debug('showing forecast for data '+JSON.stringify(data));

	var tmpl = $('#forecast_information_tmpl').text();
	var output = Mustache.to_html(tmpl, forecastData);
	$('#forecast').html(output);
}

$(function () {
	showForecast(forecast);
});
