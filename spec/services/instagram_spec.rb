require 'rails_helper'

RSpec.describe "Instagram Service", type: :model do
  attr_reader :service

  before(:each) do
    @service = InstagramService.new
  end

  xit 'returns a set of instagram data' do
    VCR.use_cassette("get_denver_instagrams") do
      instagrams = @service.get_json_map_data

      expect(instagrams).to be_an_instance_of(OpenStruct)
    end
  end


end