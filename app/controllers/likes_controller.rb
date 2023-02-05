class LikesController < ApplicationController

  before_action :find_post

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
      flash[:alert] = ""
    else
    # like = Like.create!(like_params)
    like = @current_user.likes.create!(like_params)
    render json: like, status: :created
    end
  end

  def destroy
    # if !(already_liked?)
    like = Like.find(params[:id])
      if like.user_id = @current_user.id
        like.destroy
        head :no_content
    else 
      # like = Like.find(params[:id])
      flash[:alert] = "message"
    end
  end

  private

  def like_params
    params.permit(:user_id, :post_id)
  end

  def find_post
    @post = Post.find_by(id: params[:id])
  end

  def already_liked?
    Like.where(user_id: @current_user.id, post_id:
    params[:post_id]).exists?    
  end

end