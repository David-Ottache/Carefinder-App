
import React, { SyntheticEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';


class User {
  email: string = '';
  password: string = '';
}


function Login() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const user: User = {email, password}
    if (!isValid) return;
    setErrors(() => validate(user))

    //To create user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        dispatch({type:"LOGIN", payload:user})
        if (user) {
          swal("Successful Login.", "Welcome to CareFinda", "success");
          navigate("/")
        }
      
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal("Wrong Credentials.", "Please try again", "error");
        console.log(errorCode)
        console.log(errorMessage)
    })
  }

  
  
  function validate(user: User) {
    let errors: any = { email: '', password: '' }
    if (user.email.length === 0) {
      errors.email = "**Username is required"
    }
    if (user.password.length === 0) {
      errors.password = "**Password is required"
    }
    return errors;
  }

  function isValid() {
    return (
      errors.email.length === 0 &&
      errors.password.length === 0
    )
  }
  return (
    <div className="login-container">
      <div className="row">
        <form className="input-group vertical" onSubmit={handleSubmit}>
          <h3>Login User</h3>
          <div className="input-group">
            {/* <label htmlFor="username">email</label> */}
            <input
              type="text"
              name="username"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
            />
            {errors.email.length > 0 && (
              <div className="error">
                <p>{errors.email}</p>
              </div>
            )}
          </div>
          <div className="input-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            {errors.password.length > 0 && (
              <div className="error">
                <p>{errors.password}</p>
              </div>
            )}
            
          </div>
         
          <div className="input-group">
            <button className="primary bordered small">Sign In</button>

            <Link to="/register-user" className="register-link">
              <button className="primary bordered small">
                <span>Register</span>
              </button>
            </Link>
          </div>

          <div className="social">
            <h3>or</h3>
            <p>Sign-in using ...</p>
           <button className = "Primary bordered small"> <span>Facebook</span> </button>
           <button className = "Primary bordered small"> <span>Twitter</span> </button>
           <button className = "Primary bordered small"> <span>Google</span> </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login