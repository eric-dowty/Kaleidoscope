class MapsController < ApplicationController
  
  def index
    @mapdata = if params[:lat] && params[:lon]
      InstagramService.new.get_json_map_data(location: { lat: params[:lat].to_s, lon: params[:lon].to_s })
    else
      InstagramService.new.get_json_map_data
    end

    respond_to do |format|
      format.html {}
      format.json { render json: @mapdata }
    end
  end

end
