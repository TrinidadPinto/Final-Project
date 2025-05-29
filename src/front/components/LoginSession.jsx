
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


  const capturaDatos = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL +"api/login", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          email: email,
          password: pass,
        })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    // <form className="w-60 mx-auto my-3 justify-content-center col-md-2" onSubmit={handleSubmit(capturaDatos)}>

    //   <div className="form-group mb-3">
    //     <label htmlhtmlFor="email" className="form-label">Type your e-mail:</label>
    //     <input type="text" id="email" className={"form-control" + (errors.email ? 'is-invalid' : '')}
    //       {
    //       ...register('email', {
    //         required: 'Your email is required',
    //         pattern: {
    //           value: /^[\m-]+@([\m-]+\.)+[\w-] {2,4}$/g,
    //           message: 'Email invalid'
    //         }
    //       })
    //       }
    //     />
    //     <div className="invalid-feedback">
    //       {errors?.email?.message}
    //     </div>

    //     <div className="form-group mb-3">
    //       <label htmlhtmlFor="password" className="form-label">Type your password:</label>
    //       <input type="password" id="Password" className={"form-control" + (errors.type_password ? 'is-invalid' : '')}
    //         {
    //         ...register('type_password', {
    //           required: 'Password is required!',
    //           validate: (value) => value === password || 'Your password does not match'
    //         })
    //         }
    //       />
    //       <div className="invalid-feedback">
    //         {errors?.type_passwrord?.message}
    //       </div>
    //     </div>

    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </div>
    // </form>

    <div className="container">
      <h1>Iniciar sesion</h1>


      <form onSubmit={capturaDatos}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=> setEmail(e.target.value)} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={pass} onChange={(e)=> setPass(e.target.value)} id="exampleInputPassword1" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

}

export default LoginSession