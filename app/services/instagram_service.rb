class InstagramService

  def self.get_instagrams(location)
    Instagram.media_search(location[:lat],location[:lon], options={count: 100, distance: 2400})
  end

end
