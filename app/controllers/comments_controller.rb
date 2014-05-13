class CommentsController < ApplicationController
  before_action :load_post
  def index

  end

  def show
  end

  def new
  end

  def create
    @comment = @post.comments.new(comment_params)
    if(@comment.save) 
      redirect_to @post, notice: "Thanks for your comment"
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
    def load_post
      @post = Post.find(params[:post_id])
    end

    def comment_params
      params.require(:comment).permit(:email, :body)
    end

end
