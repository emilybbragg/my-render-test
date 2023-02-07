class PostsController < ApplicationController

  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      posts = user.posts
      render json: posts
    else 
      posts = Post.all.with_attached_image
      render json: posts
    end
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = @current_user.posts.create!(post_params)
    render json: post
  end

  def update
    post = Post.find(params[:id])
    post.update!(post_params)
    render json: post
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    head :no_content
  end

  private

  def post_params
    params.permit(:caption, :user_id, :category_id, :image)
  end

   def find_post
      Post.find(params[:id])
  end
  
end