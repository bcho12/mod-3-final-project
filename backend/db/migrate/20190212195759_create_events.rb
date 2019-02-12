class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.string :url
      t.string :date
      t.string :time
      t.integer :price
    end
  end
end
