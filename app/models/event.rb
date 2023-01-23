class Event < ApplicationRecord

    has_many :distributions
    has_many :accounts, through: :distributions

    
end
