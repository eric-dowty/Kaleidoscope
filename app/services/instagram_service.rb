class InstagramService

  def self.get_instagrams(location = { lat: "39.7392", lon: "-104.9903"} )
    Instagram.media_search(location[:lat],location[:lon], options={count: 100, distance: 2400})
  end

end
