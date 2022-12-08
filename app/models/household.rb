class Household < ApplicationRecord

    has_many :beneficiaries, dependent: :destroy
    has_one :account
    has_many :distributions, through: :account

end
