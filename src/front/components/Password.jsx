import React from "react";
import {useForm} from 'react-hook-form'; 


 const PasswordSession = () => {

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
          <form className="w-60 mx-auto my-3 "  onSubmit={handleSubmit(capturaDatos)}>
            
            <div  className="form-group mb-3">
             <label htmlFor="password" className="form-label">Password:</label> 
              <input type="password" id="Password" placeholder="Enter your password" className={"form-control" + (errors.password? 'is-invalid': '')}
              
              {

                  ...register('password', {
                      required: 'Your password is required',
                      minLength:{
                        value:8,
                        

                        
                      },
                      maxLength:{
                            value: 16,
                            message: 'Password must be between 8 and 16 characters'

                      },
                       
                        pattern: {

                            value: /^[a-zA-z0-9\-\.\@\!\#\*]+$/i,
                            message: 'Password must contain: Uppercase, lowercase letters, numbers and special characters',
                        }

                    


                  })
              }

              
            />
              <div class="invalid-feedback">
                  {errors?.passwrord?.message}
              </div>
              <button className="btn btn-primary btn-sm w-75">
                Next

              </button>




                </div> // Password div ends 

            <div  className="form-group mb-3">
             <label htmlFor="password" className="form-label">Confirm password</label> 
              <input type="password" id="Password" placeholder="Confirm your password" className={"form-control" + (errors.confirm_password? 'is-invalid': '')}
              
              {

                  ...register('confirm_password', {
                      required: 'Password confirmation required!',
                      validate: (value) => value === password || 'Your password does not match'
                       
                        

                    


                  })
              }

              
            />
              <div class="invalid-feedback">
                  {errors?.confirm_passwrord?.message}
              </div>
              




                </div>




          </form>



   )
  
}

export default Password