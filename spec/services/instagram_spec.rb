require 'rails_helper'

RSpec.describe "Instagram Service", type: :model do
  attr_reader :service

  before(:each) do
    @service = InstagramService.new
  end

  xit 'returns a set of instagram data' do
    VCR.use_cassette("get_denver_instagrams") do
      instagrams = @service.get_json_map_data
      expect(instagrams).to be_an_instance_of(Array)
    end
  end

  it 'returns type data for an instagram' do
    VCR.use_cassette("get_denver_instagrams") do
      instagrams = @service.get_json_map_data      
      expected   = 'Feature'
      type       = instagrams[0][:type]
      expect(type).to eq(expected)
    end
  end

  it 'returns geometry data for an instagram' do
    VCR.use_cassette("get_denver_instagrams") do
      instagrams = @service.get_json_map_data      
      geometry   = instagrams[0][:geometry]
      expect(geometry[:type]).to eq('Point')
      expect(geometry[:coordinates]).to eq([-104.993621667, 39.756938333])
    end
  end

  it 'returns property data for an instagram' do
    VCR.use_cassette("get_denver_instagrams") do
      instagrams = @service.get_json_map_data      
      properties = instagrams[0][:properties]
      expect(properties[:image]).to eq("https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11421955_646650488767733_819341774_n.jpg")
      expect(properties[:thumbnail]).to eq("https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s150x150/e15/11421955_646650488767733_819341774_n.jpg")
      expect(properties[:post]).to eq("#rockies #sunbeams #clouds")
      expect(properties[:username]).to eq("burnsbrownii")
      expect(properties[:likes]).to eq(2)
      expect(properties[:markerColor]).to eq(nil)
      expect(properties[:markerSymbol]).to eq(nil)
      expect(properties[:markerSize]).to eq(nil)
    end
  end


end