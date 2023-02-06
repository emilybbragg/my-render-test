class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :name, :bio

  has_many :posts
  has_many :comments
  has_many :likes
  has_many :posts, {:through=>:comments, :source=>"post"}
  has_many :posts, through: :likes
  has_many :categories, {:through=>:posts, :source=>"category"}
  
end