class AddCityToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :city, :string
  end
end
