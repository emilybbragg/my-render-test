//packages
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
//components
import Post from "./Post"
//styles
import plant from "../plant.jpeg"
import Button from "../styles/Button.js"


function ProfilePage({ bio }) {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  // const [updatedBio, setUpdatedBio] = useState("")
  // const [currentUserBio, setCurrentUserBio] = useState(user?.bio)

  useEffect(() => {
    fetch("/categories")
      .then((r) => r.json())
      .then(categories => {
        if (categories && categories.length > 0) {
          setCategories(categories)
        }
      })
  }, [])

  useEffect(() => {
    if (userId) {
      fetch(`/users/${userId}`)
        .then((r) => r.json())
        .then((user) => {
          setUser(user)
        })
    }
  }, [userId])

  useEffect(() => {
    setFilteredPosts(user?.posts?.reverse())
  }, [user])

  useEffect(() => {
    if (selectedCategory === "default") {
      setFilteredPosts(user?.posts?.reverse())
    }
    else {
      const filteredPosts = user?.posts?.filter((post) => selectedCategory == post?.category_id)
      setFilteredPosts(filteredPosts?.reverse())
    }
  }, [selectedCategory])

  //UPDATING USER BIO
  // function handleUpdateUserRequest() {
  //   fetch(`/users/${userId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ bio: updatedBio }),
  //   })
  //     .then((r) => r.json())
  //     .then((updatedUserBio) => {
  //       handleUpdateUser(updatedUserBio)
  //     })
  // }

  // function handleUpdateUser(updatedUserBio) {
  //   setCurrentUserBio(updatedUserBio)
  //   setIsEditing(false)
  // }

  return (
    <>
      <div className="flex p-[3rem]"
        style={{
          backgroundImage: `url(${plant})`,
          backgroundRepeat: 'repeat-y',
          backgroundSize: 'cover',
          // height: '100vh'
        }}
      >
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center h-[600px] w-[500px] rounded-b border-2 border-white bg-white shrink-0">
            <div className="flex flex-col items-center justify-center h-fit min-h-[200px] w-[450px] bg-green-800 opacity-40 rounded items-center">
              <div className="flex flex-col items-center justify-center w-full h-fit min-h-[200px]">
                <span className="text-white text-lg font-bold">
                  {user?.name} (@{user?.username})
                </span>
                <hr className="w-[20rem] h-1 mx-auto my-4 bg-white border-0 rounded" />
                {isEditing ?
                  <input
                    className="flex text-center rounded p-1 h-[100px] w-[300px] overflow-auto"
                    placeholder="Add Your Bio Here!"
                  // value={bio}
                  // onChange={(e) => setCurrentUserBio(e.target.value)}
                  /> :
                  bio ?
                    <span className="flex text-center">{bio}</span> :
                    <span className="text-white">Edit your profile to add your bio here!</span>
                }
              </div>
              <div className="flex p-3">
                {isEditing ?
                  <Button
                  // onClick={handleUpdateUserRequest}
                  >
                    Save
                  </Button> :
                  <Button onClick={() => setIsEditing((isEditing) => !isEditing)}>Edit</Button>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex w-full h-[80px] gap-8 items-center justify-center pl-[70px]">
            <button
              className="w-[175px] h-[50px] p-3 rounded bg-white text-green-800 opacity-60 hover:border-2 hover:border-green-800"
              onClick={() => navigate("/posts/newpost")}
            >
              Create a New Post
            </button>
            <select
              className="flex items-center justify-center w-[175px] h-[50px] p-3 rounded text-green-800 opacity-60 hover:border-2 hover:border-green-800"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <>
                <option value="default">All Posts</option>
                {categories?.map((category) => (
                  <option
                    value={category?.id}
                    name={category?.name}
                  >
                    {category?.name}
                  </option>
                ))}
              </>
            </select>
          </div>
          <div className="flex justify-between p-10 gap-[10rem] w-fit overflow-y-auto h-[800px]">
            <ul className="flex flex-wrap gap-[4rem] rounded pl-[80px]">
              {filteredPosts?.length > 0 ? (filteredPosts?.map((post) => (
                <>
                  <Post
                    key={post.id}
                    id={post.id}
                    post={post}
                    user={user}
                  />
                </>
              ))
              ) :
                <span className="flex pt-[200px] text-3xl text-green-800 opacity-60">
                  No Posts Yet! Add one to get started.
                </span>
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage;