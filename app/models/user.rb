class User < ApplicationRecord

    has_secure_password 

    has_many :accounts
    has_many :households, through: :accounts

    validates :username, :password, :email, :district, :governorate, presence: true

end
