class UsersController < ApplicationController

  skip_before_action :authorize, only: :create

  def index
    users = User.all
    render json: users
  end

  def show
    if params[:id]
      user = User.find(params[:id])
      render json: user, include: [:posts]
    else
      user = User.find_by(id: session[:user_id])
      render json: user, include: [:posts]
    end
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user
  end

  def update
    user = User.find_by(id: session[:user_id])
    user.update!(user_params)
    render json: user
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :name, :bio)
  end
  
end