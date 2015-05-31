require "rails_helper"

feature "User can" do 
  
  it "see homepage when vising site" do
    visit root_path
    expect(page).to have_content("ThoughtCloud")
  end

end