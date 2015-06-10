require 'rails_helper'

RSpec.describe "Instagram Service", type: :model do
  attr_reader :service

  before(:each) do
    @service = InstagramService.new
  end

  it 'returns a set of instagram data' do
    VCR.use_cassette("get_denver_instagrams") do
      instagrams = @service.
  end


end