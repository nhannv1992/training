class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :article_id
      t.string :email
      t.text :body

      t.timestamps
    end
  end
end
