class CreateHouseholds < ActiveRecord::Migration[6.1]
  def change
    create_table :households do |t|
      t.date :date_of_entry
      t.string :address

      t.timestamps
    end
  end
end
