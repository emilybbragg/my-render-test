//packages
import { React, useState, useContext } from "react"
import { UserContext } from "../UserContext"
//components
import Icon from "./Icons"


function PostLikes({
  setPostLikes,
  postLikes,
  post
}) {

  const { user, setUser } = useContext(UserContext)
  const [liked, setLiked] = useState(postLikes?.find((like) => like?.user_id == user?.id))
  const [errors, setErrors] = useState([])

  function handlePostLikeClick() {
    const likeData = {
      user_id: user.id,
      post_id: post.id,
    }
    fetch(`/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newLike) => {
            const allLikesWithNew = [...postLikes, newLike]
            setPostLikes(allLikesWithNew)
            setLiked(true)
          })
        } else {
          r.json().then((err) => {
            setErrors([err?.error])
          })
        }
      })
  }

  function handlePostLikeDeleteClick(likes) {
    const userLike = likes?.find((like) => like?.user_id == user?.id)
    fetch(`/likes/${userLike?.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          deletePostLike(userLike)
          setLiked(false)
        }
      })
  }

  function deletePostLike(deletedLike) {
    const updatedLikes = postLikes?.filter((like) => like?.id !== deletedLike?.id)
    setPostLikes(updatedLikes)
  }

  function handleLikeButtonClick() {
    if (liked) {
      handlePostLikeDeleteClick(postLikes)
    }
    else {
      handlePostLikeClick()
    }
  }

  return (
    <>
      <button onClick={handleLikeButtonClick}>
        <Icon
          icon={liked ? "liked" : "unliked"}
          className="h-4 w-4"
        />
      </button>
      <span>{postLikes?.length || 0} likes</span>
    </>
  )
}

export default PostLikes;