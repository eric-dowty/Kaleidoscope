require 'ostruct'

class InstagramData

  def self.get_json_map_data(location: { lat: "39.7392", lon: "-104.9903"} )
    geo_data = InstagramService.get_instagrams(location).map do |instagram|
      geo_data(instagram)
    end
    OpenStruct.new(:geojson => geo_data, :hashes => popular_hashes(geo_data))
  end

  def self.popular_hashes(geo_data)
    get_hashes(geo_data).group_by { |hash| hash.upcase }.sort_by { |key, value| value.size }.reverse.take(5)
  end

  def self.get_hashes(geo_data)
    stringified_posts(geo_data).select do |possible_hash|
      possible_hash[0] == "#"
    end
  end

  def self.stringified_posts(geo_data)
    geo_data.map do |data|
      data[:properties][:post]
    end.flatten.join(' ').split(' ')
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
            :'marker-color' => '#8F8397' ,
            :'marker-symbol' => 'camera',
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
