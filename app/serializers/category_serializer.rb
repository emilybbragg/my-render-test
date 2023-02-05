class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  
  has_many :posts
  has_many :users, {:through=>:posts, :source=>"user"}

end
