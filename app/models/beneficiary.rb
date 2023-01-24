class Beneficiary < ApplicationRecord

    validates :name, :gender, :DOB, :phone_number, :national_id_number, presence: true
    validates :phone_number, length: { is: 15 }
    validates :national_id_number, length: { is: 9 }

    belongs_to :household
    
end
