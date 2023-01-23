class Beneficiary < ApplicationRecord

    validates :name, :gender, :DOB, :phone_number, :national_id_number, presence: true

    belongs_to :household
    
end
