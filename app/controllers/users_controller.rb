class UsersController < ApplicationController
	before_action :set_user, only: [:show, :edit, :update, :destroy]

	def index
		@users = User.all
	end

	#get
	def new
		@user = User.new
	end

	#POST
	def create
		@user = User.create(user_params)

		respond_to do |format|
			if @user.save
				format.html { redirect_to @user, notice:  "User was created successfully!" }
			else 
				format.html { render :new }
			end
		end
	end

	def show
		
	end

	def edit

	end

	#POST
	def update
		respond_to do |format|

			if @user.update(user_params)
				format.html { redirect_to @user, notice: 'User was successfully updated!'}
			else
				format.html { render :edit }
			end
		end

	end

	def destroy

	end

	def redirect
		a = params[:id];
		@user = User.find(a)

		redirect_to @user
		puts @user.inspect
	end

	private
	def set_user
		@user = User.find(params[:id])
	end

	def user_params
		params.require(:user).permit(:username,:password)
	end
end
