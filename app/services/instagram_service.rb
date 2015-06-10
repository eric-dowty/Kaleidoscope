require 'ostruct'

class InstagramService

  def initialize
  end

  def get_instagrams(location)
    Instagram.media_search(location[:lat],location[:lon], options={count: 100, distance: 2400})
  end

  def get_json_map_data(location: { lat: "39.7392", lon: "-104.9903"} )
    geo_data = get_instagrams(location).map do |instagram|
      geo_data(instagram)
    end
    geo_data
  end

  private

  def geo_data(instagram)
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
            :'marker-color' => '#8F8397' ,
            :'marker-symbol' => 'camera',
            :'marker-size' => 'small'
          }
        }
  end

  def optional_data(instagram)
    if instagram.caption.blank?
      return {username: "", text: ""}
    else
      return { username: instagram.caption.from.username, text: instagram.caption.text }
    end
  end

end
