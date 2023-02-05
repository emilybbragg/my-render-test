class User < ApplicationRecord

  has_secure_password

  has_many :posts
  has_many :comments
  has_many :likes
  has_many :posts, through: :likes
  has_many :posts, {:through=>:comments, :source=>"post"}
  has_many :categories, {:through=>:posts, :source=>"category"}

  validates :username, presence: true, uniqueness: true
  validates :name, presence: true

end
