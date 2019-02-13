class RemoveEventFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :event_id, :integer
  end
end
