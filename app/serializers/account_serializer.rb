class AccountSerializer < ActiveModel::Serializer
  attributes :id, :funds

  belongs_to :household
  has_many :distributions
end
