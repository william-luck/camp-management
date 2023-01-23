class Account < ApplicationRecord

    belongs_to :user
    belongs_to :household
    has_many :distributions
    has_many :events, through: :distributions
    
end
