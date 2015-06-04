class SessionsController < ApplicationController

  # def create
    # code = params[:code]

    # conn = Faraday.new(:url => 'https://api.instagram.com/oauth') do |faraday|
    #   faraday.request  :url_encoded
    #   faraday.response :logger
    #   faraday.adapter  Faraday.default_adapter 
    # end

    # response = conn.post '/access_token', { code: code,
    #                              client_id: ENV["INSTAGRAM_CLIENT"],
    #                              client_secret: ENV["INSTAGRAM_SECRET"],
    #                              grant_type: "authorization_code",
    #                              redirect_uri: "http://localhost:8080/auth/instagram/callback"
    #                                }


  def create
    user = User.find_or_create_from_auth(auth)
    if user
      session[:user_id] = user.id
      redirect_to dashboard_path
    else
      redirect_to root_path
    end
  end

  def destroy
    session.clear

    redirect_to root_path
  end


  private

  def auth
    request.env['omniauth.auth'] 
  end

end
