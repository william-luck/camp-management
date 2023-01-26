class Household < ApplicationRecord

    has_many :beneficiaries, dependent: :destroy
    has_one :account, dependent: :destroy
    has_many :distributions, through: :account
    has_one :user, through: :account

    validates_associated :beneficiaries

    validates :address, presence: true

end
