class AddForeignKeyToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :event_id, :integer
  end
end
