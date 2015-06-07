$(document).ready(function(){

L.mapbox.accessToken = $('#map-data').data('token')
 
var geojsonData = $('#map-data').data('geojson')
var turing = [39.750081, -104.999703];

window.geojsonData = $('#map-data').data('geojson')

window.map = L.mapbox.map('map', 'boomkenster.mbi8c0ap').setView(turing, 13);
    L.control.locate({
        setView: true,
        locateOptions:{maxZoom:13}
    }).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
        var coordinates = [e.latlng.toString()]
}
map.on('click', onMapClick);
    //     map.addLayer(layer);
    // map.setView(HELSINKI, 19);

    // map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
    //     .on('locationfound', function(e){
    //         var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
    //         var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
    //             weight: 1,
    //             color: 'blue',
    //             fillColor: '#cacaca',
    //             fillOpacity: 0.2
    //         });
    //         map.addLayer(marker);
    //         map.addLayer(circle);
    //     })
    //    .on('locationerror', function(e){
    //         console.log(e);
    //         alert("Location access denied.");
    //     });

window.highlightLayer = L.mapbox.featureLayer().addTo(map); 
window.markerLayer = L.mapbox.featureLayer().addTo(map);

  markerLayer.setGeoJSON(geojsonData);

  markerLayer.on('mouseover', function(e) {
    var marker  = e.layer;
    popUpAll(marker);
  });

  markerLayer.on('mouseout', function(e) {
    e.layer.closePopup();
  });


  highlightLayer.on('mouseover', function(z) {
    var marker  = z.layer;
    popUpAll(marker);
  });

  highlightLayer.on('mouseout', function(z) {
    z.layer.closePopup();
  });

  var popUpAll = function(marker){
    var popupContent = '<a target="_blank" class="popup" href="#"> </a>' +
                                '<p> <img class="popup-pic" src="' + marker.feature.properties.thumbnail + '"/> <br>' +
                                        + "<br>Likes: " + marker.feature.properties.likes +
                                '</p>'
    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        maxWidth: 220
    });

    marker.openPopup();
  }

});
