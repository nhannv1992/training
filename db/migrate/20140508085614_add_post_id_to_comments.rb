class AddPostIdToComments < ActiveRecord::Migration
  def change
  	rename_column :comments, :article_id, :post_id
  end
end
