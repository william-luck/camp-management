class DistributionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :amount, :collected, :date, :event_id

  belongs_to :account
  
end
