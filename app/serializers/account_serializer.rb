class AccountSerializer < ActiveModel::Serializer
  attributes :id, :funds

  belongs_to :household
end
