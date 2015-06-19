$SkimThroughSkimThroughSkimThroughSkimThroughSkimThrough(document).ready(function(){

  //Set mapbox map view
  L.mapbox.accessToken = $('#map-data').data('token')
  var map              = L.mapbox.map('map', 'boomkenster.mbi8c0ap')
  var markerLayer      = L.mapbox.featureLayer().addTo(map);
  var turing           = [39.750081, -104.999703];
  var geolocate        = document.getElementById('geolocate');
  var popup            = L.popup();
  map.setView(turing, 13);

  L.control.locate({
      setView: true,
      locateOptions:{maxZoom:14}
  }).addTo(map);

  function addRows(data){
    $('#instagram-table').html("");
    var htmlData = ""
    for(i=0; i<data.length; i++){
      htmlData = htmlData + rowHTML(i, data[i])
    };
    $("#instagram-table").append(htmlData)
  }

  function addTags(hashArray){
    $("#popular-hashes").html("")
    var tagData = ""
    for(i=0; i<hashArray.length; i++){
      tagData = tagData + tagHTML(hashArray[i])
    }
    $("#popular-hashes").append(tagData)
  }

  function mapHighlight(data){

    $(".instagram-row").mouseenter(function() {
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

    function highlightMarker(index) {
      var instagramMarker = data[index]
      instagramMarker.properties['marker-color'] = "#5D2A7D";
      instagramMarker.properties['marker-size']  = 'large';
      markerLayer.setGeoJSON(data);
    }

    function resetMarker(index) {
      var instagramMarker = data[index]
      instagramMarker.properties['marker-color'] = '#8F8397';
      instagramMarker.properties['marker-size']  = 'small';
    }

  }

  function createPoints(coordinates){
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
    addTags(popularHashes(data))

    markerLayer.setGeoJSON(data);
  });

  function popUpAll(marker){
    var popupContent = '<a target="_blank" class="popup" href="#"> </a>'
                       + '<p> <img class="popup-pic" src="' 
                       + marker.feature.properties.thumbnail + '"/> </p>'

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        maxWidth: 220
    });

    marker.openPopup();
  }

  };

  if (!navigator.geolocation) {
      geolocate.innerHTML = 'Geolocation is not available';
  } else {
      geolocate.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          map.locate();
      };
  }

  map.on('locationfound', function(e) {
    map.setView(e.latlng, 13);
    markerLayer.clearLayers()
    createPoints(e.latlng);
  });

  function onMapClick(e){
      popup
          .setLatLng(e.latlng)
          .setContent("<p class='instagram-likes'>Focusing your kaleidoscope</p>")
          .openOn(map);
          markerLayer.clearLayers()
          createPoints(e.latlng);
  }

  map.on('click', onMapClick);

  // Create points on page load
  createPoints();

});

//HELPER FUNCTIONS

function popularHashes(data){
  var stringifiedPosts = ""
  for(i=0; i<data.length; i++){
    stringifiedPosts = stringifiedPosts + " " + data[i]["properties"]["post"]
  }
  
  var hashes_and_all = stringifiedPosts.split(" ");
  var hashes = []
  for(i=0; i<hashes_and_all.length; i++){
    if(hashes_and_all[i].charAt(0) === "#"){
      hashes.push(hashes_and_all[i].toLowerCase())
    }
  }
  
  var hashCount = {}
  for(i=0; i<hashes.length; i++){
    if(hashCount[hashes[i]]){
      hashCount[hashes[i]] = hashCount[hashes[i]] + 1
    } else {
      hashCount[hashes[i]] = 1
    }
  }

  var mostLikes = 0
  var keys = []
  Object.keys(hashCount).forEach(function (key) { 
    if(hashCount[key] > mostLikes){
      mostLikes = hashCount[key]
    }
    keys.push(key)
  })

  var mostPopular = []
  if(keys.length<=5){
    for(i=0; i<keys.length; i++){
      mostPopular.push(keys[i])
    }
  } else {
    for(i=0; mostPopular.length<5; i++){
      if(i === keys.length-1 ){
        i = 0
        mostLikes = mostLikes - 1
      }
      if(hashCount[keys[i]] === mostLikes){
        mostPopular.push(keys[i])
      }
    }
  }

  return mostPopular
}

function tagHTML(hash){
  return("<li>" + hash + "</li>")
}

function rowHTML(index, data) {
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