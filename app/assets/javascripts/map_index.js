$(document).ready(function(){

  $('.instagram-row').mouseenter(function() {
    if ($(this).data('index') === 0 ){
      $(this).addClass('row-one-higlight')  
    } else {
      $(this).addClass('row-highlight')
    }
    highlightMarker($(this).data('index'))
  });

  $('.instagram-row').mouseleave(function() {
    if ($(this).data('index') === 0 ){
      $(this).removeClass('row-one-higlight')  
    } else {
      $(this).removeClass('row-highlight')
    }
    resetMarker($(this).data('index'))
  });

  var highlightMarker = function(index) {
    var instagramMarker = geojsonData[index]
    console.log(instagramMarker)
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