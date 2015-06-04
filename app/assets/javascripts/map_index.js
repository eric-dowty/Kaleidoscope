$(document).ready(function(){

  var highlightLayer = L.mapbox.featureLayer().addTo(map); 

  $('.instagram-row').mouseenter(function() {
    $(this).addClass('glow')
    highlightMarker($(this).data('index'))
  });

  $('.instagram-row').mouseleave(function() {
    $(this).removeClass('glow')
    resetMarker($(this).data('index'))
  });

  var highlightMarker = function(index) {
    var instagramMarker = geojsonData[index]
    instagramMarker.properties['marker-color'] = "#f86767";
    instagramMarker.properties['marker-size']  = 'large';
    console.log(instagramMarker)
    highlightLayer.setGeoJSON(instagramMarker);
  }

  var resetMarker = function(index) {
    var instagramMarker = geojsonData[index]
    instagramMarker.properties['marker-color'] = '#63b6e5';
    instagramMarker.properties['marker-size']  = 'small';
    highlightLayer.setGeoJSON(
      instagramMarker);
  }

});