class HomeController < ApplicationController
	def index
		@message = 'Hello world'

		@arr = ["Home","Gallery","About","Contact"]

	end
end
