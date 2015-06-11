describe("Map", function() {

  var geoData = {}

  beforeAll(function(){

    geoData = 
    {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [39, -104]
          },
          properties: {
            image:     "image",
            thumbnail: "thumbnail",
            post:      "post #post1",
            username:  "username",
            likes:     "likes",
            markerColor : '#8F8397' ,
            markerSymbol : 'camera',
            markerSize : 'small'
          }
  }

  })

  it("returns the top five popular hashes", function() {
    var arr  = []
    for(i=0; i<10; i++){
      arr.push(geoData)
    }
    expect(popularHashes(arr)).toEqual(['#post1']);
  });

  it("returns the top popular hashes if there are less than 5", function() {
    var arr  = []
    for(i=0; i<3; i++){
      arr.push(geoData)
    }
    expect(popularHashes(arr)).toEqual(['#post1']);
  });

  it("returns html for a li", function(){
    var hash = '#post1'
    expect(tagHTML(hash)).toEqual("<li>#post1</li>");
  });

  var html = ("<tr class='instagram-row' data-index=1>"
              + "<td class='instagram-thumb'>"
              +  "<img src=thumbnail alt='instagram picture' /><br>"
              +  "<button class='btn btn-collapse' type='button' data-toggle='collapse' data-target='#post-data1' aria-expanded='false' aria-controls='post-data1'>"
              +  "<span class='glyphicon glyphicon-chevron-down' aria-hidden='true'></span>"
              +  "</button><div class='collapse' id='post-data1'>"
              +  "<div class='instagram-username'>username<br>"
              +  "</div><div class='instagram-post'>post #post1<br>"
              +  "</div><div class='instagram-likes'>Likes:likes</div></div>"
              + "</td></tr>")

  it("returns html for a row", function(){
    expect(rowHTML(1, geoData)).toEqual(html);
  });

});