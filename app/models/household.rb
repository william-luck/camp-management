class Household < ApplicationRecord

    has_many :beneficiaries
    has_one :account
    has_many :distributions, through :account
    
end
