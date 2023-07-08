import React, { SyntheticEvent, useState } from 'react';
import {  getFirestore, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { app, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import "../static/UserForm.css";

const db = getFirestore(app);

class User {
  username: string = "";
  email: string = "";
  address: string = "";
  number: string = "";
  password: string = "";
}


function UserForm() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    address: "",
    number: "",
    password: "",
  });

  
  const navigate = useNavigate();

  const handleTelephone = (newPhone: string | undefined) => {
    setPhone(newPhone || ''); 
    setNumber(newPhone ? newPhone.replace(/\D/g, '') : '0'); 
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
   
    const user: User = {username, email, address, number, password};
    
    if (!isValid) return;
    setErrors(() => validate(user));
    
    try {
      const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await setDoc(doc(db, "users", res.user.uid), {
        username: username,
        email: email,
        address: address,
        number: number,
        password: password,
        timestamp: serverTimestamp()
      });
      swal("Registration successful","Login to CareFinda","success")
      navigate("/login-user")
    } catch (error) {
      swal("Registration Failed", "Please try again", "error");
      navigate("/register-user")
      console.log(error)
    }
  }


  function validate(user: User) {
    let errors: any = { username: "", email: "", address: "", number: 0, password: "" };
    if (user.username.length === 0) {
      errors.username = "**Username is required";
    }
    if (user.email.length === 0) {
      errors.email = "**Email is required";
    }
    if (user.address.length === 0) {
      errors.address = "**Address is required";
    }
    if (user.number.length === 0) {
      errors.number = "**Number is required";
    }
    if (user.password.length === 0) {
      errors.password = "**Password is required";
    }
    return errors;
  }


   function isValid() {
     return (
       errors.username.length === 0 &&
       errors.email.length === 0 &&
       errors.address.length === 0 &&
       errors.number.length === 0 &&
       errors.password.length === 0);
   }
  return (
    <div className="new-user-container">
      <div className="row">
        <div className="col-6-sm">
          <form className="input-group vertical" onSubmit={handleSubmit}>
            <h4>User Registration</h4>
            <div className="input-group">
              {/* <label htmlFor="username">Username</label> */}
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username.length > 0 && (
                <div className="error">
                  <p>{errors.username}</p>
                </div>
              )}
            </div>
            <div className="input-group">
              {/* <label htmlFor="email">Email</label> */}
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email.length > 0 && (
                <div className="error">
                  <p>{errors.email}</p>
                </div>
              )}
            </div>
            <div className="input-group">
              {/* <label htmlFor="address">Address</label> */}
              <textarea
                name="address"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address.length > 0 && (
                <div className="error">
                  <p>{errors.address}</p>
                </div>
              )}
            </div>
            <div className="input-group">
              {/* <label htmlFor="number">Number</label> */}
              {/* <input
                type="number"
                name="number"
                // value={number}
                onChange={(e) => {
                  setNumber(Number(e.target.value));
                }}
                placeholder="Enter your mobile number"
              /> */}
              <PhoneInput
                className='phone-input'
                placeholder="Enter your mobile number"
                value={phone}
                onChange={handleTelephone}
              />
                {errors.number.length > 0 && (
                <div className="error">
                  <p>{errors.number}</p>
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
                placeholder="Enter your password"
              />
              {errors.password.length > 0 && (
                <div className="error">
                  <p>{errors.password}</p>
                </div>
              )}
            </div>
            <div className="input-group">
              <button className="primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserForm