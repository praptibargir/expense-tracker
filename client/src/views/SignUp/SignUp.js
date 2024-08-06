import React, { useState } from 'react';
import "./SignUp.css";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import {Link} from "react-router-dom"

function SignUp() {

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        dob: ""
    })

    const signup = async () => {
        const response = await axios.post(`${process.env.REACT_APP_Backend_URL}/signup`, {
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            dob: user.dob
        })

        if (response.data.success) {
            toast.success(response.data.message)

            setUser({
                fullName: "",
                email: "",
                password: "",
                dob: ""
            })
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='container'>
            <h1 className='title'>User Registration</h1>

            <form className='form-container'>
                <input
                    type='text'
                    placeholder='Enter Full Name'
                    className='user-input'
                    value={user.fullName}
                    onChange={(e) => {
                        setUser({ ...user, fullName: e.target.value })
                    }}
                />

                <input
                    type='email'
                    placeholder='Enter Email'
                    className='user-input'
                    value={user.email}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }}
                />

                <input
                    type='password'
                    placeholder='Enter Password'
                    className='user-input'
                    value={user.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }}
                />

                <input
                    type='date'
                    placeholder='Date of Birth'
                    className='user-input'
                    value={user.dob}
                    onChange={(e) => {
                        setUser({ ...user, dob: e.target.value })
                    }}
                />


                <button
                    type='button'
                    className='btn'
                    onClick={signup}>
                    Register Now
                </button>
            </form>

            <Link to="/login" className="link">Already have an account? Login</Link>

            <Toaster />
        </div>
    )
}

export default SignUp