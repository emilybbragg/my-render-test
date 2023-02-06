class LikesController < ApplicationController

  def index
    if params[:post_id]
      post = Post.find(params[:post_id])
      likes = post.likes
      render json: likes
    else 
      likes = Likes.all
      render json: likes
    end
  end

  def create
    if already_liked?
      flash[:alert] = "already liked"
    else
    like = @current_user.likes.create!(like_params)
    render json: like, status: :created
    end
  end

  def destroy
    like = Like.find(params[:id])
      if like.user_id = @current_user.id
        like.destroy
        head :no_content
    else 
      flash[:alert] = "already unliked"
    end
  end

  private

  def like_params
    params.permit(:user_id, :post_id)
  end

  def already_liked?
    Like.where(user_id: @current_user.id, post_id:
    params[:post_id]).exists?    
  end

end