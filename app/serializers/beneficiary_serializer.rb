class BeneficiarySerializer < ActiveModel::Serializer
  attributes :id, :name, :gender, :DOB, :phone_number, :national_id_number, :head_of_HH, :household_id

  belongs_to :household
end
