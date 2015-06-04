class User < ActiveRecord::Base

    def self.find_or_create_from_auth(auth)
    user = User.find_or_create_by(
      uid:      auth.uid
      )

    user.username     = auth.info.nickname,
    user.full_name    = auth.info.name,
    user.uid          = auth.uid,
    user.image_url    = auth.info.image,
    user.access_token = auth.credentials.token
    user.save
    user
  end
end
