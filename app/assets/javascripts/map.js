$(document).ready(function(){

//Set mapbox map view
L.mapbox.accessToken = $('#map-data').data('token')
var map              = L.mapbox.map('map', 'boomkenster.mbi8c0ap')
var markerLayer      = L.mapbox.featureLayer().addTo(map);
var turing           = [39.750081, -104.999703];
map.setView(turing, 13);

var rowHTML = function(index, data) {
  return("<tr class='instagram-row' data-index="+index+">"
         + "<td class='instagram-thumb'>"
         +  "<img src="+data["properties"]["thumbnail"]+" alt='instagram picture' /><br>"
         +  "<button class='btn btn-collapse' type='button' data-toggle='collapse' data-target='#post-data"+index+"' aria-expanded='false' aria-controls='post-data"+index+"'>"
         +  "<span class='glyphicon glyphicon-chevron-down' aria-hidden='true'></span>"
         +  "</button><div class='collapse' id='post-data"+index+"'>"
         +  "<div class='instagram-username'>"+data["properties"]["username"]+"<br>"
         +  "</div><div class='instagram-post'>"+data["properties"]["post"]+"<br>"
         +  "</div><div class='instagram-likes'>Likes:"+data["properties"]["likes"]+"</div></div>"
         + "</td></tr>")
}

var addRows = function(data){
  $('#instagram-table').html("");
  var htmlData = ""
  for(i=1; i<data.length; i++){
    htmlData = htmlData + rowHTML(i, data[i])
  };
  $("#instagram-table").append(htmlData)
}

var mapHighlight = function(data){

  $(".instagram-row").mouseenter(function() {
    if ($(this).data('index') === 1 ){
      $(this).addClass('row-one-higlight')  
    } else {
      $(this).addClass('row-highlight')
    }
    highlightMarker($(this).data('index'))
  });

  $('.instagram-row').mouseleave(function() {
    if ($(this).data('index') === 1 ){
      $(this).removeClass('row-one-higlight')  
    } else {
      $(this).removeClass('row-highlight')
    }
    resetMarker($(this).data('index'))
  });

  var highlightMarker = function(index) {
    var instagramMarker = data[index]
    instagramMarker.properties['marker-color'] = "#B502CD";
    instagramMarker.properties['marker-size']  = 'large';
    markerLayer.setGeoJSON(data);
  }

  var resetMarker = function(index) {
    var instagramMarker = data[index]
    instagramMarker.properties['marker-color'] = '#000000';
    instagramMarker.properties['marker-size']  = 'small';
  }
}

var createPoints = function(coordinates){
  var url = '/maps.json'
  if (coordinates !== undefined) {
    url += '?lat=' + coordinates['lat'] + '&lon=' + coordinates['lng'];
  }
  $.get(url, function(data) {
  markerLayer.on('mouseover', function(e) {
    var marker  = e.layer;
    popUpAll(marker);
  });

  markerLayer.on('mouseout', function(e) {
    e.layer.closePopup();
  });
  
  addRows(data)
  mapHighlight(data)
  
  markerLayer.setGeoJSON(data);
  });

  var popUpAll = function(marker){
    var popupContent = '<a target="_blank" class="popup" href="#"> </a>' +
                                '<p> <img class="popup-pic" src="' + marker.feature.properties.thumbnail + '"/> </p>'
    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        maxWidth: 220
    });

    marker.openPopup();
  }

};


$("#location-btn").on('click', function(){
    map.locate();
});

map.on('locationfound', function(e) {
});

var popup = L.popup();

var onMapClick = function(e){
    popup
        .setLatLng(e.latlng)
        .setContent("Loading up the pix!")
        .openOn(map);
        markerLayer.clearLayers()
        createPoints(e.latlng);
}

map.on('click', onMapClick);

// Create points on page load
createPoints();

});



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
