//packages
import React, { useState, useContext } from 'react'
import { UserContext } from "../UserContext"
//styles
import FormField from "../styles/FormField"
import Button from "../styles/Button.js"
import Input from "../styles/Input.js"

function SignupPage({ bio }) {

  const { user, setUser } = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        name,
        bio
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <span className="flex items-center justify-center">Full Name</span>
        <Input
          className="!w-[300px]"
          type="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>
      <FormField>
        <span className="flex items-center justify-center">Username</span>
        <Input
          className="!w-[300px]"
          type="text"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <span className="flex items-center justify-center">Password</span>
        <Input
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <span className="flex items-center justify-center">Password Confirmation</span>
        <Input
          type="password"
          autoComplete="off"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </FormField>
      <FormField>
        <div className="flex flex-col items-center justify-center">
          <Button
            className="hover:border-2 !border-green-800"
            type="submit"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </div>
      </FormField>
      <FormField>
        <div className="flex flex-col items-center justify-center text-red-700">
          {errors?.map((err) => (
            <ul key={err}>Error: {err}</ul>
          ))}
        </div>
      </FormField>
    </form>
  )
}

export default SignupPage;