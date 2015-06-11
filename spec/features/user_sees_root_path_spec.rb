require 'rails_helper'

RSpec.feature "map page", type: :feature do

  scenario "user visits homepage" do
    VCR.use_cassette("get_denver_instagrams") do 
      visit root_path

      expect(page).to have_content("Point - Click - View")
      expect(page).to have_content("See Most Recent Posts")
      expect(page).to have_content("Find My Location")
      expect(page).to have_content("Popular Tags")
    end
  end

  scenario "user looks at instagram data" do
    VCR.use_cassette("get_denver_instagrams") do 
    end
  end


end
