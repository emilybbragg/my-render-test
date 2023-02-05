//packages
import React, { useState } from "react"
import { useParams } from "react-router-dom"


function EditPost({
  handleUpdatePost,
  setIsEditing
}) {
  const { postId } = useParams()

  const [caption, setCaption] = useState("")
  const [updatedCaption, setUpdatedCaption] = useState("")

  function handlePostUpdateSubmit(e) {
    e.preventDefault()
    fetch(`/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caption: updatedCaption
      }),
    })
      .then((r) => r.json())
      .then((updatedPost) => {
        handleUpdatePost(updatedPost)
      })
      .then(() => setIsEditing(false))
  }

  function handleCaptionChange(e) {
    setUpdatedCaption(e.target.value)
  }

  return (
    <form onSubmit={handlePostUpdateSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          className="border-black border-2 rounded"
          placeholder={caption}
          value={updatedCaption}
          onChange={handleCaptionChange}
        />
        <button className="" type="submit" value="Save">Save</button>
      </div>
    </form>
  )
}

export default EditPost;