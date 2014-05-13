class PostsController < ApplicationController
  before_action :set_user, only: [:create, :show, :edit, :udate, :destroy]
  def index
      @posts = Post.all
  end

  def show
      
  end

  def new

  end

  def create
      @post = @user.posts.new(post_params)
      if(@post.save)
        redirect_to @user, notice: "New post added!"
      end
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private 
    def set_user
      @user = User.find(params[:user_id])
    end
    def post_params
        params.require(:post).permit(:title, :body, :published_at)
    end
end
