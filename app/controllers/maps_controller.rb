class MapsController < ApplicationController
  def index
    @geo_json = InstagramData.get_json_map_data
  end

  def show

  end
end
