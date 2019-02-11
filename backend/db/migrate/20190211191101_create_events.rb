class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :event_id
      t.string :name
      t.string :url
      t.string :date
      t.string :time
      t.string :info
      t.integer :min_price
      t.integer :max_price

      t.timestamps
    end
  end
end
