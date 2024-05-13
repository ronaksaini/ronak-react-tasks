import React, { useState } from "react";
import './Login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
          // Redirect or show success message
          alert("Logged in successfully")
          navigate('/to-do-list')
        } catch (error) {
          console.error('Error signing up:', error.message);
          alert(error.message);
        }
      };
  return (
    <div className="login">
      <div className="login-container">
        <h2 className="title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="email">E-mail:</label>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}required/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}required/>
          </div>
          <input type="submit" value="Login" id="login-btn"/>
        </form>
       <div style={{textAlign:"center", margin:"12px 0px"}}>
       <p>Not a user ?</p><p onClick={()=>navigate('/signup')}className="not-a-user">Signup</p>
       </div>
      </div>
    </div>
  );
};

export default Login;
