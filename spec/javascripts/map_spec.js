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
            post:      "post",
            username:  "username",
            likes:     "likes",
            markerColor : '#8F8397' ,
            markerSymbol : 'camera',
            markerSize : 'small'
          }
  }

  })

  it("adds rows", function() {
    console.log(Kaleidoscope);
    var arr  = [geoData]
    // Kaleidoscope.addRows(arr);
    var table = $("#instagram-table");
    expect(table.html()).not.toEqual("");
  });

});