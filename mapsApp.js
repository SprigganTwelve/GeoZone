var map = L.map('map').setView([51.505, -0.09], 13);//get map with geographic coordonate and zoom level

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map); // for adding a marker to our map

var circle = L.circle([51.5, -0.09], {
    with: 700,
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.5, -0.09],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup() //openPopup imadiately open the popup handler; only works on marker element
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon."); //attach some information to an object of map

/*-----specify the parammaters, more than a simple object of map that you can alter whatever tou want */
var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.") 
    .openOn(map);

// Here we use openOn instead of addTo because it handles automatic closing of a previously opened popup when opening a new one which is good for usability

/*--- */


//dealing with the events 

map.on('click', onMapClick);

//Handler

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

var popup = L.popup(); //create a pupop through L object

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);