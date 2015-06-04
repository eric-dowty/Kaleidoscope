$(document).ready(function(){

L.mapbox.accessToken = $('#map-data').data('token')


window.geojsonData = $('#map-data').data('geojson')

window.map = L.mapbox.map('map', 'boomkenster.mbi8c0ap').setView([39.750081, -104.999703], 13);

window.markerLayer = L.mapbox.featureLayer().addTo(map);

markerLayer.setGeoJSON(geojsonData);

markerLayer.on('mouseover', function(e) {
    var marker  = e.layer;
    var popupContent = '<a target="_blank" class="popup" href="#"> </a>' +
                                '<p> <img class="popup-pic" src="' + marker.feature.properties.thumbnail + '"/> <br>' +
                                        marker.feature.properties.post + "<br>Likes: " +
                                        marker.feature.properties.likes +
                                '</p>'
    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        maxWidth: 220
    });

    marker.openPopup();

  });

  markerLayer.on('mouseout', function(e) {
    e.layer.closePopup();
  });

});
