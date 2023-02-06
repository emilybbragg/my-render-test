//packages
import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../UserContext"
//components
import Comment from "./Comment"
//styles
import FormField from "../styles/FormField"
import Button from "../styles/Button"


function CommentList({
  post,
  comments,
  setComments,
  isShowingAllComments,
  setIsShowingAllComments
}) {
  const { user, setUser } = useContext(UserContext)
  const [commentDescription, setCommentDescription] = useState("")
  const [errors, setErrors] = useState([])

  function handleCommentSubmit(e) {
    e.preventDefault()
    if (commentDescription) {
      const commentData = {
        description: commentDescription,
        user_id: user.id,
        post_id: post.id,
      }
      fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((newComment) => {
              const allCommentsWithNew = [...comments, newComment]
              setComments(allCommentsWithNew)
              setCommentDescription("")
              setIsShowingAllComments(true)
            })
          } else {
            r.json().then((err) => {
              setErrors((err?.error))
            })
          }
        })
    }
  }

  function handleCommentDeleteClick(comment) {
    fetch(`/api/comments/${comment.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          deleteComment(comment)
        }
      })
  }

  function deleteComment(deletedComment) {
    const updatedComments = comments?.filter((comment) => comment?.id !== deletedComment?.id)
    setComments(updatedComments)
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between">
        <ul className="flex flex-col items-start w-[500px] h-[300px] gap-2 overflow-y-auto">
          {comments && comments?.length > 0 ? (comments?.map((comment) =>
            <>
              <Comment
                key={comment.id}
                id={comment.id}
                comment={comment}
                handleCommentDeleteClick={handleCommentDeleteClick}
                post={post}
              />
            </>
          )
          ) :
            <span className="flex items-center font-serif font-semibold text-lg">This post has no comments yet!</span>
          }
        </ul>

        {isShowingAllComments ?
          <form className="flex items-center gap-2" onSubmit={handleCommentSubmit} type="submit">
            <br></br>
            <FormField>
              <textarea
                placeholder="Leave a comment..."
                type="text"
                className="rounded p-1 overflow-auto w-[400px] border-2 border-green-800"
                rows="2"
                value={commentDescription}
                onChange={(e) => setCommentDescription(e.target.value)} />
            </FormField>
            <FormField>
              <Button type="button" onClick={handleCommentSubmit}>Submit</Button>
            </FormField>
            <FormField>
              <div className="flex flex-col items-center justify-center text-red-700">
                {errors?.map((err) => (
                  <ul key={err}>Error: {err}</ul>
                ))}
              </div>
            </FormField>
          </form>
          : ""}
      </div>
    </>
  )
}

export default CommentList;