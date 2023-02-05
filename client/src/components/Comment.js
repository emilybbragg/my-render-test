//packages
import React, { useContext } from "react"
import { UserContext } from "../UserContext"

function Comment({
  comment,
  handleCommentDeleteClick
}) {

  const { user, setUser } = useContext(UserContext)

  return (
    <>
      <ul className="flex w-fit h-fit gap-2 font-serif">
        <>
          <span className="font-semibold">{comment?.username || comment?.user?.username || ""}</span>
          <span className="">{comment?.description}</span>
          {comment?.user_id == user?.id ?
            <button className="" onClick={() => handleCommentDeleteClick(comment)}>
              <span role="img" aria-label="delete">🗑</span>
            </button> :
            ""}
        </>
      </ul>
    </>
  )
}

export default Comment;