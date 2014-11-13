/* 
 * Weather Tracker script by Samuel Cole.
 * Below is the link to the weather json thing.
 * http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20%28select%20woeid%20from%20geo.places%281%29%20where%20text%3D%22melbourne%2C%20vic%22%29%20and%20u%3D%22c%22&format=json&callback=
 */

var WeatherTracker = function() {
    
};
