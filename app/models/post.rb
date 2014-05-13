class Post < ActiveRecord::Base
	belongs_to :user

	has_many :comments

	has_many :posts_categories, -> { order("created_at DESC")}
	has_many :categories, :through => :posts_categories

	#named scope
	scope :recent, lambda { where("id > ?", 3)}

end
