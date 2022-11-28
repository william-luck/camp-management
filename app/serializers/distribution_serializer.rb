class DistributionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :amount, :collected, :date

  belongs_to :account
end
