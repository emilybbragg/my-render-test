//packages
import React, { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"
//styles
import Button from "../styles/Button.js"
import plant from "../plant.jpeg"


function CreateNewPostPage() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const imageUpload = useRef()

  const [postCaption, setPostCaption] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState("")
  const [errors, setErrors] = useState([])

  const navigateToHome = () => {
    navigate("/posts")
  }

  useEffect(() => {
    setSelectedImage(null)
    setSelectedImagePreview("")
    fetch("/api/categories")
      .then((r) => r.json())
      .then(categories => {
        if (categories && categories.length > 0) {
          setCategories(categories)
        }
      })
  }, [])

  useEffect(() => {
    if (selectedImage) {
      setSelectedImagePreview(URL.createObjectURL(selectedImage))
    }
    else {
      setSelectedImagePreview("")
    }
  }, [selectedImage])

  function handlePostSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage)
    formData.append('user_id', user?.id)
    formData.append('caption', postCaption)
    formData.append('category_id', selectedCategory)
    console.log(formData)
    fetch("/api/posts", {
      method: "POST",
      body: formData
    })
      .then((r) => {
        console.log(r)
        navigateToHome()
        // window.location.href = "/posts"
      })
  }

  return (
    <div className="flex flex-col items-center pt-[50px]"
      style={{
        backgroundImage: `url(${plant})`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: 'cover',
        height: '100vh'
      }}
    >
      <div className="flex flex-col items-center justify-center h-[600px] w-[500px] rounded border-2 border-white bg-white">
        <form className="flex flex-col items-center justify-between w-full px-4 h-fit gap-10" onSubmit={handlePostSubmit}>
          <div className="flex items-center justify-center h-[300px] w-full px-4 border-2 rounded-sm border-black">
            <input
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              ref={imageUpload}
              accept="image/png, image/jpeg"
            />
            {selectedImagePreview ?
              <img className="h-[300px] w-[300px] object-cover" src={selectedImagePreview || ""} /> :
              <div className="h-[300px] w-[300px]"></div>
            }
          </div>
          <div className="grid grid-cols-6 gap-1 h-[200px] w-full bg-green-800 opacity-40 rounded">
            <div className="flex items-center justify-center pt-8 pl-8 col-span-3">
              <textarea
                placeholder="Add your caption here!"
                className="rounded p-1 overflow-auto w-full"
                rows="4"
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center pt-8 col-span-3">
              <select
                name="categories"
                className="flex items-center justify-center p-1 rounded text-green-800 hover:border-2 hover:border-green-800 bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="default">Select a Category</option>
                {categories?.map((category) => (
                  <option value={category?.id} name={category?.name}>
                    {category?.name}
                  </option>
                ))}
              </select>
              <Button type="submit">Post</Button>
            </div>
            <div>
              {errors?.map((err) => (
                <ul key={err} className="">
                  Error: {err}
                </ul>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewPostPage;