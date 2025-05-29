
import React from "react";
import {useForm} from 'react-hook-form'; 


 const LoginSession = () => {

  const {
      register,
      handleSubmit,
      watch,
      formState: {errors}

  } = useForm ()

      const password = watch('password', '')


      const capturaDatos = (data) =>{
        console.log('Informacion personal')
      }



   return (
          <form className="w-60 mx-auto my-3 justify-content-center col-md-2" onSubmit={handleSubmit(capturaDatos)}>
            
            <div  className="form-group mb-3">
             <label htmlFor="email" className="form-label">Type your e-mail:</label> 
              <input type="text" id="email" className={"form-control" + (errors.email? 'is-invalid': '')}
              
              {

                  ...register('email', {
                      required: 'Your email is required',
                       pattern: {

                        value: /^[\m-]+@([\m-]+\.)+[\w-] {2,4}$/g,
                        message: 'Email invalid'

                        

                    }


                  })
              }

              
            />
              <div class="invalid-feedback">
                  {errors?.email?.message}
              

               
            </div>

            <div  className="form-group mb-3">
             <label htmlFor="password" className="form-label">Type your password:</label> 
              <input type="password" id="Password" className={"form-control" + (errors.type_password? 'is-invalid': '')}
              
              {

                  ...register('type_password', {
                      required: 'Password is required!',
                      validate: (value) => value === password || 'Your password does not match'
                       
                        

                    


                  })
              }

              
            />
              <div class="invalid-feedback">
                  {errors?.type_passwrord?.message}
              </div>
              




                </div>

              <button type="submit" class="btn btn-primary">Submit</button>
               

            </div>



          </form>



   )
  
}

export  default LoginSession