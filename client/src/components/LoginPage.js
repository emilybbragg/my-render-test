//packages
import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"
//components
import SignupPage from "./SignupPage"
import LoginForm from "./LoginForm"
//styles
import styled from "styled-components"
import Button from "../styles/Button.js"
import plants from "../plants.jpeg"


function LoginPage() {

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [showLogin, setShowLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      navigate("/posts")
    }
    else {
      setIsLoading(false)
    }
  }, [user])

  return (
    <>
      <div className="flex items-center justify-center"
        style={{
          backgroundImage: `url(${plants})`,
          height: '750px'
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
        }} >
        <div className="flex flex-col items-center justify-center h-[700px] w-[500px] p-3
        bg-green-50 opacity-90 border-4 border-green-800 rounded-lg">
          <div className="flex flex-col items-center">
            <span className="font-serif font-semibold text-xl text-green-800">Plant Parenthood</span>
            <br />
            <span className="font-serif text-sm">Share. Create. Connect.</span>
          </div>
          <br />
          {showLogin ? (
            <>
              <LoginForm />
              <Divider />
              <div className="flex flex-col items-center justify-center gap-3">
                <span>Don't have an account?</span>
                <Button
                  className="hover:border-2 !border-green-800"
                  onClick={() => setShowLogin(false)}
                >
                  Sign Up
                </Button>
              </div>
            </>
          ) : (
            <>
              <SignupPage />
              <Divider />
              <div className="flex flex-col items-center justify-center gap-3">
                <span>Already have an account?</span>
                <Button
                  className="hover:border-2 !border-green-800"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #FAEBD7;
  margin: 16px 0;
`;

export default LoginPage;