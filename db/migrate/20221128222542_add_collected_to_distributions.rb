class AddCollectedToDistributions < ActiveRecord::Migration[6.1]
  def change
    add_column :distributions, :collected, :boolean
  end
end
