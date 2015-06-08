$(document).ready(function(){

L.mapbox.accessToken = $('#map-data').data('token')
 
window.geojsonData = {}

var addRow = function(index, data){
    $("#instagram-table").append("<tr class='instagram-row' data-index="+index+
                              "><td class='instagram-thumb'><img src=" + data["properties"]["thumbnail"] + 
                              " alt='instagram picture' /><br><button class='btn btn-collapse' type='button' data-toggle='collapse' data-target='#post-data" + 
                              index + "' aria-expanded='false' aria-controls='post-data" + index + 
                              "'><span class='glyphicon glyphicon-chevron-down' aria-hidden='true'></span></button><div class='collapse' id='post-data" + index +
                              "'><div class='instagram-username'>" +data["properties"]["username"] + 
                              "<br></div><div class='instagram-post'>" + data["properties"]["post"] + 
                              "<br></div><div class='instagram-likes'>Likes:" + data["properties"]["likes"] +
                              "</div></div></td></tr>")
}

var table = document.getElementById("instagram-table")

var createPoints = function(coordinates){
  var url = '/maps.json'
  if (coordinates !== undefined) {
    url += '?lat=' + coordinates['lat'] + '&lon=' + coordinates['lng'];
   }

    $.get(url, function(data) {
      window.markerLayer = L.mapbox.featureLayer().addTo(map);
      window.geojsonData = data
      markerLayer.setGeoJSON(data);

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

      table.innerHTML = "";
      for(i=1; i<data.length;i++){

        addRow(i, data[i])
      };

        $(".instagram-row").mouseenter(function() {
    console.log("enter")
    if ($(this).data('index') === 0 ){
      $(this).addClass('row-one-higlight')  
    } else {
      $(this).addClass('row-highlight')
    }
    highlightMarker($(this).data('index'))
  });

  $('.instagram-row').mouseleave(function() {
    console.log("leave")
    if ($(this).data('index') === 0 ){
      $(this).removeClass('row-one-higlight')  
    } else {
      $(this).removeClass('row-highlight')
    }
    resetMarker($(this).data('index'))
  });


  var highlightMarker = function(index) {
    var instagramMarker = geojsonData[index]
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

var turing = [39.750081, -104.999703];


window.map = L.mapbox.map('map', 'boomkenster.mbi8c0ap')

map.setView(turing, 13);

$("#location-btn").on('click', function(){
    map.locate();
});

map.on('locationfound', function(e) {
});

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Loading up the pix!")
        .openOn(map);
        map.removeLayer(markerLayer);
        createPoints(e.latlng);
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

createPoints();



});
