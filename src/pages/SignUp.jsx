import React, { useState } from 'react'
import '../css/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Notification from '../components/Notifications'

function SignUp() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signUp, createDoc } = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 6) {
            toast.error("Password Length Must Be At Least 6 Digits")
        } else {
            try {
                await signUp(email, password)
                await createDoc(email)
                navigate("/")
            } catch (error) {
                console.log(error)
                toast.error("Invalid Email Or Password")
                setEmail("")
                setPassword("")
            }
        }
    }

    return (
        <div className='signup'>
            <div className='signup_border'>
                <h1>Sing Up</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <span className="input-span">
                        <label className='email_label' htmlFor='email'>Email <span>e.g. user@user.com</span></label>
                        <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </span>
                    <span className="input-span">
                        <label className='password_label' htmlFor='password'>Password <span>e.g. 123456</span></label>
                        <input required type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </span>
                    <button className="submit" >Sign Up</button>
                    <span className="span">Already subscribed to MovieWeb <Link to='/login'>Sign In</Link></span>
                </form>
            </div>
            <Notification />
        </div>
    )
}

export default SignUp