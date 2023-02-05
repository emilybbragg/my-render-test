class PostSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers
    attributes :id, :caption, :user_id, :category_id, :image
  
    belongs_to :user
    belongs_to :category
  
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
  
    has_many :users, through: :likes
    has_many :users, {:through=>:comments, :source=>"user"}
  
    def image
      rails_blob_path(object.image, only_path: true) if object.image.attached?
    end

    # Rails.application.routes.url_helpers.rails_representation_url(object.original_file(resize: "300x300").processed, only_path: true)

end
