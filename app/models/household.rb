class Household < ApplicationRecord

    has_many :beneficiaries, dependent: :destroy
    has_one :account
    has_many :distributions, through: :account

    validates_associated :beneficiaries
    # validates :address, presence: true

end
