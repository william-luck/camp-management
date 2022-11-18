class ChangeAccountHhId < ActiveRecord::Migration[6.1]
  def change
    rename_column :accounts, :HH_id, :household_id
  end
end
