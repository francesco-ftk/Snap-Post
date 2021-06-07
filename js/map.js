var mymap = L.map('mapid').setView([43.773, 11.255], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 4,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmFuem8iLCJhIjoiY2twODZkZXFjMDV5ODJ5b2dtc3lyYm5qMyJ9.c-pRfXAUsbjdQJ7FpUjZuQ'
}).addTo(mymap);

var marker = L.marker([43.773, 11.255]).addTo(mymap); <!-- Cordinate da passare con geolocalizzazione -->

var circle = L.circle([43.773, 11.255], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100
}).addTo(mymap);

var markers = L.markerClusterGroup();
markers.addLayer(L.marker([44.773, 11.255])); <!-- Cordinate da passare con pagine wikipedia -->
markers.addLayer(L.marker([44.773, 11.256]));
mymap.addLayer(markers);