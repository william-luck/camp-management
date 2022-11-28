class DistributionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :amount

  belongs_to :account
end
