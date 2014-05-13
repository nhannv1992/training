class User < ActiveRecord::Base

	validates_uniqueness_of :username

	has_one :profile
	has_many :posts


	scope :where_name, lambda { |username| where("users.username like ?", "%" +username + "%") }

end
