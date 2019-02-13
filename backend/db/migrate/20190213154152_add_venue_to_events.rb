class AddVenueToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :venue, :string
  end
end
