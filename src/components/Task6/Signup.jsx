import React, { useState } from "react";
import './Login.css'
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      // Redirect or show success message
      alert("Signed up successfully")
      navigate('/')
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert(error.message)
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-field">
            <label htmlFor="email">E-mail:</label>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}required/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}required/>
          </div>
          <input type="submit" value="Sign Up" id="login-btn"/>
        </form>
       <div style={{textAlign:"center", margin:"12px 0px"}}>
       <p>Already a user ?</p><p className="not-a-user"onClick={()=>navigate('/')}>Login</p>
       </div>
      </div>
    </div>
  );
};

export default Signup;
