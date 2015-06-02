class HomeController < ApplicationController
  def index
  end

  def instagram
    @media = Instagram.media_search("39.750081", "-104.999703", options ={ count: 100})
  end
end
