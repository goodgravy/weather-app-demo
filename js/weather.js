function populateWeatherConditions (weather) {
	var tmpl, output;

	forge.logging.log("[populateWeatherConditions] beginning populating weather conditions");

	tmpl = $("#forecast_information_tmpl").html();
	output = Mustache.to_html(tmpl, weather.current_observation);
	$("#forecast_information").append(output);
	forge.logging.log("[populateWeatherConditions] finished populating forecast information");

	tmpl = $("#current_conditions_tmpl").html();
	output = Mustache.to_html(tmpl, weather.current_observation);
	$("#current_conditions").append(output);
	forge.logging.log("[populateWeatherConditions] finished populating current conditions");

	tmpl = $("#forecast_conditions_tmpl").html();
	output = Mustache.to_html(tmpl, weather.forecast.simpleforecast);
	$("#forecast_conditions table tr").append(output);
	forge.logging.log("[populateWeatherConditions] finished populating forecast conditions");

	forge.logging.log("[populateWeatherConditions] finished populating weather conditions");
};


function getWeatherInfo(location, callback) {
	var api_key = "YOUR_API_KEY";
	forge.logging.info("[getWeatherInfo] getting weather for for " + location);
	forge.request.ajax({
		url: "http://api.wunderground.com/api/" + api_key +
				"/conditions/forecast/q/" +	location + ".json",
		dataType: "json",
		success: function (data) {
			forge.logging.info("[getWeatherInfo] success");
			callback(data);
		},
		error: function (error) {
			forge.logging.error("[getWeatherInfo] " + JSON.stringify(error));
		}
	});
};


$(function () {
	getWeatherInfo("CA/San_Francisco", populateWeatherConditions);
});

