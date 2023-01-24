class Beneficiary < ApplicationRecord

    validates :name, :gender, :DOB, :phone_number, :national_id_number, presence: true
    validates :phone_number, length: { is: 14 }
    validates :national_id_number, length: { is: 8 }

    belongs_to :household
    
end
