$(document).ready(function(){

  $(".instagram-index").scroll(function(){
    var x = ($(window).width()*0.6) + 75
    var element = document.elementFromPoint(x, 220);
    if ( element.nodeName === 'TD' && element.getAttribute('class').replace(/[0-9]/g, '') === 'instagram-thumb') {
      if ( $(element).parent().prev().hasClass('danger') ) {
        $(element).parent().prev().removeClass('danger')
      }
      var instagramGeo = $(element).children('#marker-highlight').data('geojson')
      $(element).parent().addClass('danger')  
      var index = element.getAttribute('class').match(/\d+/)[0]
      setMarkerColor(parseInt(index))
    }
  });

  var setMarkerColor = function(index) {
    geojsonData[index].properties['marker-color'] = "#f86767";
    geojsonData[index].properties['marker-size']  = 'large';
    geojsonData[index-1].properties['marker-color'] = '#63b6e5';
    geojsonData[index-1].properties['marker-size']  = 'small';
    markerLayer.setGeoJSON(geojsonData);
  }

});