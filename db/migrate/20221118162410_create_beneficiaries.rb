class CreateBeneficiaries < ActiveRecord::Migration[6.1]
  def change
    create_table :beneficiaries do |t|
      t.string :name
      t.string :gender
      t.date :DOB
      t.string :phone_number
      t.integer :national_id_number
      t.boolean :head_of_HH
      t.integer :HH_id

      t.timestamps
    end
  end
end
