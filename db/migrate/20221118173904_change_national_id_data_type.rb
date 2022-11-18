class ChangeNationalIdDataType < ActiveRecord::Migration[6.1]
  def change

    change_column :beneficiaries, :national_id_number, :string
  end
end
