class User < ActiveRecord::Base

    def self.find_or_create_from_auth(auth)
    user = User.find_or_create_by(
      username:      user.username
      )

    user.username     = auth.info.nickname,
    user.full_name    = auth.info.name,
    user.uid          = auth.uid,
    user.access_token = auth.credentials.token
    user.save
    binding.pry
    user
  end
end
