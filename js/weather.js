/* - part 1 ------------------------------------------------------------- */

window.forge.enableDebug();

var weather = {
	"current_observation": {
		"display_location": {
			"city": "San Francisco",
			"state": "CA"
		},
		"observation_time":"Last Updated on September 20, 3:50 AM PDT",
		"weather": "Mostly Cloudy",
		"temp_f": 54.4,
		"temp_c": 12.4,		
		"relative_humidity":"89%",
		"wind_string":"From the WNW at 4.0 MPH Gusting to 11.0 MPH",
		"icon_url":"http://icons-ak.wxug.com/i/c/k/nt_mostlycloudy.gif"
	},
	"forecast": {
		"simpleforecast": {
			"forecastday": [
				{ "date": {	"weekday_short": "Thu" },
				  "period": 1,
				  "high": { "fahrenheit": "64", "celsius": "18" },
				  "low": { "fahrenheit": "54", "celsius": "12" },
				  "conditions": "Partly Cloudy",
				  "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif" },
				{ "date": { "weekday_short": "Fri" },
				  "period": 2,
				  "high": { "fahrenheit": "70",	"celsius": "21"	},
				  "low": { "fahrenheit": "54", "celsius": "12" },
				  "conditions": "Partly Cloudy",
				  "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif" },
				{ "date": { "weekday_short": "Sat" },
				  "period": 3,
				  "high": { "fahrenheit": "70", "celsius": "21" },
				  "low": { "fahrenheit": "52", "celsius": "11" },
				  "conditions": "Partly Cloudy",
				  "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif" }
			]
		}
	}
};

forge.logging.log(weather);


/* - part 2 ------------------------------------------------------------- */

$(function () {
	//populateWeatherConditions(weather);
	//getWeatherInfo("CA/San_Francisco", populateWeatherConditions);

	// part 4
	var cities = [ { name: "London", code: "UK/London" },
				   { name: "San Francisco", code: "CA/San_Francisco" },
				   { name: "Cape Town", code: "ZA/Cape_Town" },
				   { name: "Barcelona", code: "ES/Barcelona" },
				   { name: "Boston", code: "NY/Boston" },
				   { name: "New York", code: "NY/New_York" },
				   { name: "Washington DC", code: "DC/Washington" },
				   { name: "Tampa", code: "FL/Tampa" },
				   { name: "Houston", code: "AL/Houston" },
				   { name: "Montreal", code: "CYUL" },
				   { name: "Los Angeles", code: "CA/Los_Angeles" },
				   { name: "Miami", code: "FL/Miami" },
				   { name: "West Palm Beach", code: "FL/West_Palm_Beach" } ];
	cities.forEach(function(city) {	// TODO use mustache
		$("#city_menu").append("<option value='" + city.code + "'>" + 
							   city.name +
							   "</option>");
	});
	$("#city_menu").change(function() {
		var city = $("#city_menu option:selected").val();
		forge.prefs.set("city", city);
		getWeatherInfo(city, populateWeatherConditions);
	});
	forge.prefs.get("city", function(resource) {
		if (resource) { // user has previously selected a city
			var city = resource;
		} else { // no previous selection
			var city = "CA/San_Francisco";
		}
		$("#city_menu").val(city);
		$("#city_menu").change();
	}, function (error) {
		forge.logging.error("failed when retrieving city preferences");
		$("#city_menu").val("CA/San_Francisco"); // default;
	});
});


function populateWeatherConditions (weather) {
    var tmpl, output;

	emptyContent(); // part 4

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


/* - part 3 ------------------------------------------------------------- */

// curl http://api.wunderground.com/api/cef30204fb4bc178/conditions/forecast/q/CA/San_Francisco.json

function getWeatherInfo(location, callback) {
	var api_key = "cef30204fb4bc178";
	var url = "http://api.wunderground.com/api/" + 
			api_key +
			"/conditions/forecast/q/" +	
			location + 
			".json"

	forge.logging.info("[getWeatherInfo] getting weather for for " + location);
    forge.request.ajax({
        url: url,
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


/* - part 4 ------------------------------------------------------------- */

function emptyContent() {
	forge.logging.log("[emptyContent] removing old data");
	$("#forecast_information").empty();
    $("#current_conditions").empty();
    $("#forecast_conditions table tr").empty();
	
    forge.logging.log("[emptyContent] finished emptying content");
};

