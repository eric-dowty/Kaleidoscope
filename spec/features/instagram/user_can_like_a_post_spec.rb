require "rails_helper"

feature "User can" do 
  
  xit "like a photo when on homepage" do
    visit root_path
    within 
    expect(page).to have_content("ThoughtCloud")
  end

end