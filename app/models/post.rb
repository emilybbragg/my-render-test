class Post < ApplicationRecord
  # include ActiveModel::Serializers::JSON

  has_one_attached :image

  belongs_to :user
  belongs_to :category

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :users, through: :likes
  has_many :users, {:through=>:comments, :source=>"user"}

  validates :image, presence: true
  validates :caption, presence: true
  validates :category, presence: true

end
