class AccountSerializer < ActiveModel::Serializer
  attributes :id, :funds, :user_id

  belongs_to :household
  has_many :distributions
end
