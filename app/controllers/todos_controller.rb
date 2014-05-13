class TodosController < ApplicationController
	before_action :set_todo, only: [:show, :edit, :update, :destroy]

	def index
		@todos = Todo.all
	end

	def show
		render json: @todo
	end

	def new
		@todo = Todo.new
	end

	def create
		@todo = Todo.new(todo_params)

		respond_to do |format|
			if(@todo.save)
				format.html do
					redirect_to todos_path, notice: "Added added successfully"
				end
			end
		end
	end

	def edit
		
	end

	def update
		@todo = Todo.find(params[:id])
		if(@todo.update(todo_params))
			render json: @todo
		end
	end

	def todosList
		render json: Todo.all
	end


	def destroy
		
	end

	private

	def set_todo
		@todo = Todo.find(params[:id])
	end

	def todo_params
		params.require(:todo).permit(:name, :status)
	end







end



