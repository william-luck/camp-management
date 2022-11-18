class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email, :district, :governorate
end
