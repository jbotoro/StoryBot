class CreateStories < ActiveRecord::Migration[7.2]
  def change
    create_table :stories do |t|
      t.text :content, null: false
      t.json :versions, default: [], null: false
      t.timestamps
    end
  end
end
