class InstagramData

def self.get_json_map_data
  InstagramService.get_instagrams.map do |instagram|
    geo_data(instagram)
  end
end


  private

    def self.geo_data(instagram)
      {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [instagram.location.longitude, instagram.location.latitude]
            },
            properties: {
              image:     instagram.images.standard_resolution.url,
              thumbnail: instagram.images.thumbnail.url,
              post:      optional_data(instagram)[:text],
              username:  optional_data(instagram)[:username],
              likes:     instagram.likes.count,
              :'marker-color' => '#63b6e5',
              :'marker-symbol' => 'post',
              :'marker-size' => 'small'
            }
          }
    end

    def self.optional_data(instagram)
      if instagram.caption.blank?
        return {username: "", text: ""}
      else
        return { username: instagram.caption.from.username, text: instagram.caption.text }
      end
    end
end
