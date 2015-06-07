Rails.application.config.middleware.use OmniAuth::Builder do

  provider :instagram, ENV['INSTAGRAM_CLIENT'], ENV['INSTAGRAM_SECRET'], {:scope => "basic likes comments relationships"}

end