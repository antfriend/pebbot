/**
 * 
 * Pebbot, the pebble robot application
 */

var ajax = require('ajax');
var UI = require('ui');
var Accel = require('ui/accel');
var Vector2 = require('vector2');

Accel.init();
Accel.config({rate:25,samples:1,subscribe:false});


// Construct URL
var cityName = 'Boise';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;
var counterit = 0;

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log('Successfully fetched weather data!');
  
    // Extract data
    var location = data.name;
    var temperature = Math.round(data.main.temp - 273.15) + 'C';
  
    // Always upper-case first letter of description
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);
    // Show to user
    card.subtitle(location + ', ' + temperature);
    counterit++;
    
    card.body('count ' + counterit);
    
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);

// Display the Card
card.show();

card.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Pebbot!',
    textAlign: 'center'
  });
  Accel.peek(function(a) {
    console.log('Current acceleration on axis are: X=' + a.accel.x + ' Y=' + a.accel.y + ' Z=' + a.accel.z);
  });
  wind.add(textfield);
  wind.show();
});

