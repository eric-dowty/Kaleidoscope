$(document).ready(function(){

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
    console.log(instagramMarker)
    $(instagramMarker).css('z-index', '999')
    instagramMarker.properties['marker-color'] = "#B502CD";
    instagramMarker.properties['marker-size']  = 'large';
    markerLayer.setGeoJSON(geojsonData);
    highlightLayer.setGeoJSON(instagramMarker);
  }

  var resetMarker = function(index) {
    var instagramMarker = geojsonData[index]
    instagramMarker.properties['marker-color'] = '#000000';
    instagramMarker.properties['marker-size']  = 'small';
  }

});