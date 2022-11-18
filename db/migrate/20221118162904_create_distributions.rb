class CreateDistributions < ActiveRecord::Migration[6.1]
  def change
    create_table :distributions do |t|
      t.integer :account_id
      t.integer :amount

      t.timestamps
    end
  end
end
