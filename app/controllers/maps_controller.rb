class MapsController < ApplicationController
  
  def index
    @geojson = if params[:lat] && params[:lon]
      InstagramData.get_json_map_data(location: { lat: params[:lat].to_s, lon: params[:lon].to_s })
    else
     InstagramData.get_json_map_data
    end

    respond_to do |format|
      format.html {}
      format.json { render json: @geojson }
    end
  end

  def show
  end

end
