class MapsController < ApplicationController
  
  def index
    @geojson = InstagramData.get_json_map_data
  end

  def show
  end

end
