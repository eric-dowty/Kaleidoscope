require "rails_helper"

feature "User can" do 
  
  it "see homepage when vising site" do
  VCR.use_cassette("get_denver_instagrams") do 
      visit root_path
      expect(page).to have_content("Point - Click - View See Most Recent Posts!")
    end
  end

end