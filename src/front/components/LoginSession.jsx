
import React, { useState } from "react";
import { useForm } from 'react-hook-form';


const LoginSession = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }

  } = useForm()

  const password = watch('password', '')


  const capturaDatos = async (info) => {
   
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (

    <div className="container">
      <h1>Iniciar sesion</h1>


      <form className="w-60 mx-auto my-3 justify-content-center col-md-3" onSubmit={handleSubmit(capturaDatos)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className={"form-control " + (errors.email ? 'is-invalid' : '')}
            id="email"

            {
            ...register('email', {
              required: 'Your email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is invalid!'
              }
            })
            }
          />
          <div className="invalid-feedback">
            {errors?.email?.message}
          </div>
        </div>




        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className={"form-control " + (errors.password ? 'is-invalid' : '')}
            id="password"

            {
            ...register('password', {
              required: 'Password is required!',

            })
            }
          />
          <div className="invalid-feedback">
            {errors?.password?.message}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    </div>
  )

}

export default LoginSession