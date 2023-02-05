//packages
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
//components
import EditPost from "./EditPost"
import Icon from "./Icons"
import PostLikes from "./PostLikes"

function SinglePost({
  post,
  postId,
  postLikes,
  setPostLikes,
  handleUpdatePost,
  handlePostDeleteClick,
  isEditing,
  setIsEditing,
  setIsAddingComment,
  setIsShowingAllComments
}) {

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const navigateToProfile = (userId) => {
    navigate(`/users/${userId}`)
  }

  console.log(post)

  return (
    <>
      <div className="flex flex-col">
        <ul className="flex flex-col">
          <div className="flex flex-col items-center justify-between h-[500px] w-[500px] bg-green-800 text-black border-4 border-white rounded-t">
            <img src={post?.image} />
          </div>
          <div className={`flex flex-col p-3 h-fit w-[500px] gap-2 bg-white border-2 border-white text-black
            ${isEditing && post.user?.id == user.id ? "rounded-none" : post.user?.id == user.id ? "rounded-none" : "rounded-b"}
          `}>
            <div className="flex row items-start gap-2">
              <div className="flex items-center pt-[4px] gap-2">
                <PostLikes
                  postLikes={postLikes}
                  setPostLikes={setPostLikes}
                  post={post}
                  postId={postId}
                />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex items-center pt-[4px]">
                <button onClick={() => setIsAddingComment(true)}>
                  <Icon
                    icon="comment"
                    className="h-4 w-4" />
                </button>
              </div>
              <button onClick={() => setIsShowingAllComments(true)}>
                View all comments
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex items-start font-bold" onClick={() => navigateToProfile(post?.user?.id)}>
                {post?.username || post?.user?.username || ""}
              </button>
              {isEditing && post.user?.id == user.id ?
                <EditPost
                  id={post.id}
                  post={post}
                  handleUpdatePost={handleUpdatePost}
                  setIsEditing={setIsEditing}
                  className="border-black border-2"
                /> :
                <span>{post?.caption || ""}</span>
              }
            </div>
            <div className="flex gap-2">
              <span>Category:</span>
              <span>{post?.category?.name || ""}</span>
            </div>
          </div>
        </ul>
        {!isEditing && post?.user?.id == user.id ? (
          <>
            <div className="flex justify-between bg-white rounded-b px-3 pb-3">
              <button className="" onClick={() => setIsEditing((isEditing) => !isEditing)}>
                <span role="img" aria-label="edit">Edit Post ✏️</span>
              </button>
              <button className=""
                onClick={() => handlePostDeleteClick(post)}
              >
                <span role="img" aria-label="delete">Delete Post 🗑</span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default SinglePost;