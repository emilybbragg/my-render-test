//packages
import React, { useState, useEffect } from "react"
import { UserContext } from "../UserContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//components
import HomePage from "../pages/HomePage"
import NavBar from "./NavBar"
//pages
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import SinglePostPage from "../pages/SinglePostPage"
import ProfilePage from "../pages/ProfilePage"
import CreateNewPostPage from "../pages/CreateNewPostPage"


function App() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          if (user !== null) {
            setUser(user)
          }
        })
      }
    })
  }, [])

  return (
    <div>
      <>
        {!user ?
          <UserContext.Provider value={{ user, setUser }}>
            <LoginPage />
          </UserContext.Provider> :
          <UserContext.Provider value={{ user, setUser }}>
            <NavBar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage posts={posts} setPosts={setPosts} />} />
              <Route path="/post-view/:postId" element={<SinglePostPage posts={posts} setPosts={setPosts} />} />
              <Route path="/new-post" element={<CreateNewPostPage posts={posts} setPosts={setPosts} />} />
              <Route path="/profile/:userId" element={<ProfilePage posts={posts} setPosts={setPosts} />} />
            </Routes>
          </UserContext.Provider>
        }
      </>
    </div>
  )
}

export default App;