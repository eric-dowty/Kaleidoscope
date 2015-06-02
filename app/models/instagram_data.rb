class InstagramData

def self.get_json_map_data
  geo_json = []
  geo_json << geo_data
end


private

def self.geo_data
  {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-104.999703, 39.750081]
        },
        properties: {
          image:    "My Photo",
          post:     "User",
          username: "Username", 
          likes:    10,
          :'marker-color' => '#63b6e5',
          :'marker-symbol' => 'post',
          :'marker-size' => 'small'
        }
      }
end
end