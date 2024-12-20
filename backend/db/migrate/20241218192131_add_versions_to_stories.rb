class AddVersionsToStories < ActiveRecord::Migration[7.2]
  def change
    add_column :stories, :versions, :json, default: [], null: false
  end
end
