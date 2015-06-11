require 'rails_helper'

RSpec.describe MapsController, type: :controller do

  describe "GET #index" do
    VCR.use_cassette("index_page") do
      xit "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
    end
  end

end
