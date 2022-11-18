class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :beneficiaries, :HH_id, :household_id
  end
end
