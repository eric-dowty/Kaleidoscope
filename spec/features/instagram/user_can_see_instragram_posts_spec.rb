require "rails_helper"

feature "User can" do 
    it "can view homepage" do
      VCR.use_cassette("index_page") do 
        visit root_path
        expect(page).to have_content("Find")
    end
  end

  xit "can view instagram posts" do
      VCR.use_cassette("index_page") do 
       visit root_path
        within('.instagram-table') do
          first('.btn').click
        end
       expect(page).to have_content("likes")
     end
  end

end