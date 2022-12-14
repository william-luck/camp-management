class HouseholdSerializer < ActiveModel::Serializer
  attributes :id, :date_of_entry, :address

  has_many :beneficiaries
  has_one :account
end
