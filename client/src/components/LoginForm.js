//packages
import React, { useState, useContext } from 'react'
import { UserContext } from "../UserContext"
//styles
import FormField from "../styles/FormField.js"
import Input from "../styles/Input.js"
import Button from "../styles/Button.js"


function LoginForm({

}) {
  const { user, setUser } = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user))
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <div className="flex flex-col items-center justify-center">
          <Button className="hover:border-2 !border-green-800">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </div>
      </FormField>
      <FormField>
        <div className="flex flex-col items-center justify-center text-red-700">
          {errors?.map((err) => (
            <ul key={err}
              className=""
            >
              Error: {err}
            </ul>
          ))}
        </div>
      </FormField>
    </form>
  )
}

export default LoginForm;