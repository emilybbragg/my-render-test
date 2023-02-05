//packages
import React, { useEffect, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from "../UserContext"


function NavBar({ }) {

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user == null) {
      navigate("/")
    }
  }, [])

  // useEffect(() => {
  //   console.groupCollapsed("User from NavBar")
  //   console.log(user)
  //   console.groupEnd()
  // }, [user])

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/")
      }
    })
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full h-[80px] gap-3 p-3 bg-green-800 opacity-40">
        <div className="flex items-center justify-start gap-4">
          <span className="font-serif font-semibold text-4xl text-white">Hello, {user?.username}!</span>
        </div>
        <div className="flex flex-row justify-end items-center gap-3">
          <Link
            to="/posts"
            className="text-white w-[100px] h-[40px] p-2 rounded-lg flex justify-center items-center hover:border-2 border-white"
          >
            Home
          </Link>
          <Link
            to={`/users/${user?.id}`}
            className="text-white w-[100px] h-[40px] p-2 rounded-lg flex justify-center items-center hover:border-2 !border-white"
          >
            My Profile
          </Link>
          <button
            onClick={handleLogoutClick}
            className="text-white w-[100px] h-[40px] p-2 rounded-lg flex justify-center items-center hover:border-2 !border-white"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default NavBar;




