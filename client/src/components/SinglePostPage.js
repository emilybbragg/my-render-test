//packages
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
//components
import SinglePost from './SinglePost'
import CommentList from "./CommentList"
//styles
import plant from "../plant.jpeg"


function SinglePostPage({
  setPosts,
  selectedImage,
  setSelectedImage
}) {

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { postId } = useParams()

  const [currentPost, setCurrentPost] = useState({})
  const [postLikes, setPostLikes] = useState([])
  const [comments, setComments] = useState([])
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [isShowingAllComments, setIsShowingAllComments] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const navigateToHome = () => {
    navigate("/posts")
  }

  useEffect(() => {
    fetch(`/posts/${postId}/likes`)
      .then((r) => r.json())
      .then((postLikes) => {
        setPostLikes(postLikes)
      })
  }, [postId])

  useEffect(() => {
    fetch(`/posts/${postId}/comments`)
      .then((r) => r.json())
      .then((comments) => {
        setComments(comments)
      })
  }, [postId])

  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then((r) => r.json())
      .then((p) => {
        setCurrentPost(p)
      })
  }, [postId])

  function handlePostDeleteClick(post) {
    fetch(`/posts/${postId}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          deletePost(post)
        }
        navigateToHome()
      })
  }

  function handleUpdatePost(updatedPost) {
    setCurrentPost(updatedPost)
    setIsEditing(false)
  }

  function deletePost(deletedPost) {
    const updatedPosts = user?.posts.filter((post) => post.id !== deletedPost.id)
    setPosts(updatedPosts)
  }

  return (
    <>
      <div className="flex items-center justify-center py-[50px] gap-[9rem]"
        style={{
          backgroundImage: `url(${plant})`,
          backgroundRepeat: 'repeat-y',
          backgroundSize: 'cover',
          // height: '100vh'
        }}
      >
        <SinglePost
          key={currentPost.id}
          id={currentPost.id}
          post={currentPost}
          handleUpdatePost={handleUpdatePost}
          handlePostDeleteClick={handlePostDeleteClick}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          comments={comments}
          setComments={setComments}
          setIsAddingComment={setIsAddingComment}
          setIsShowingAllComments={setIsShowingAllComments}
          isShowingAllComments={isShowingAllComments}
          postLikes={postLikes}
          setPostLikes={setPostLikes}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {isShowingAllComments || isAddingComment ?
          <div className="flex border-2 border-white rounded p-3 h-fit min-h-[500px] w-[550px] overflow-y-scroll">
            <CommentList
              post={currentPost}
              postId={postId}
              comments={comments}
              setComments={setComments}
              isAddingComment={isAddingComment}
              setIsAddingComment={setIsAddingComment}
              setIsShowingAllComments={setIsShowingAllComments}
            />
          </div> : ""}
      </div>
    </>
  )
}

export default SinglePostPage;
