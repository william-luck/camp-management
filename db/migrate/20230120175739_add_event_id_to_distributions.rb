class AddEventIdToDistributions < ActiveRecord::Migration[6.1]
  def change
    add_column :distributions, :event_id, :integer
  end
end
