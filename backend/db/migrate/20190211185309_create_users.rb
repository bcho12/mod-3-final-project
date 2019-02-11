class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :image
      t.integer :age
      t.string :city

      t.timestamps
    end
  end
end
