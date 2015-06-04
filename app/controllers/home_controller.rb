class HomeController < ApplicationController
  def index
  end

  def instagram
    @media = Instagram.media_search("39.740567", "-104.988746", options ={ count: 100})
  end
end
