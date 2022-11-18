class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.integer :user_id
      t.integer :HH_id
      t.integer :funds

      t.timestamps
    end
  end
end
