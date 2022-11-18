class AccountSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :HH_id, :funds
end
