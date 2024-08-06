import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom"

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async () => {
    const response = await axios.post(`${process.env.REACT_APP_Backend_URL}/login`, {
      email: email,
      password: password,
    })

    if (response.data.success) {
      toast.success(response.data.message)

      localStorage.setItem('currentUser',JSON.stringify(response.data.data))

      toast.loading("Redirectiong to dashboard")

      setTimeout(()=>{
        window.location.href="/"
      },3000)

    } else {
      toast.error(response.data.message)
    }

  }

  return (
    <div className='container'>
      <h1 className='title'>User Login</h1>

      <form className='form-container'>

        <input
          type='email'
          placeholder='Enter Email'
          className='user-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Enter Password'
          className='user-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type='button'
          className='btn'
          onClick={loginNow}>
          Login Now
        </button>
      </form>

      <Link to="/SignUp" className="link">Don't have an account? Sign Up</Link>

      <Toaster />
    </div>
  )
}

export default Login