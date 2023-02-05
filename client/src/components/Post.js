//packages
import React from "react"
import { useNavigate } from "react-router-dom"


function Post({
  post
}) {

  const navigate = useNavigate()

  const navigateToPost = (postId) => {
    navigate(`/posts/${postId}`)
  }

  const navigateToProfile = (userId) => {
    navigate(`/users/${userId}`)
  }

  return (
    <>
      <ul className="flex">
        <div className="flex flex-col items-center justify-between h-[300px] w-[300px] bg-green-800 border-4 border-white rounded-t text-black">
          <img src={post?.image} />
          <div className="flex items-center justify-between h-[40px] w-[300px] gap-3 bg-white p-3 rounded-b">
            <button onClick={() => navigateToPost(post?.id)}>View Post</button>
            <button onClick={() => navigateToProfile(post?.user_id)}>
              {post?.username || post?.user?.username || ""}
            </button>
          </div>
        </div>
      </ul>
    </>
  )
}

export default Post;