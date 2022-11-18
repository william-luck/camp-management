class AddDateToDistributions < ActiveRecord::Migration[6.1]
  def change
    add_column :distributions, :date, :date
  end
end
