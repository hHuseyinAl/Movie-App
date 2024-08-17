import React, { useState } from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Notification from '../components/Notifications'
import { auth } from '../../firebase'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { logIn, resetPassword } = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await logIn(email, password)
            navigate("/")
            if (location.pathname === "/") {
                setTimeout(() => {
                    toast.success("Successfully Logged In")
                }, 100);
            }
        } catch (error) {
                console.log(error)
                toast.error("Invalid Email Or Password")
                setEmail("")
                setPassword("")
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async ()=>{
        try {
            await resetPassword(auth, email)
            toast.success("Password Reset Email Has Sent To Your Email Account Please Check Your Inbox")
        } catch (error) {
            if (error.code == 'auth/missing-email') {
                toast.error("Please Fill The Email Section To Reset Your Password")
            }else{
                toast.error("An Unexpected Error Occurred")
            }
        }
    }

    return (
        <div className='login'>
            <div className='login_border'>
                <h1>Login</h1>
                <form className="formlog" onSubmit={handleSubmit}>
                    <span className="input-span">
                        <label htmlFor='email'>Email</label>
                        <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></span>
                    <span className="input-span">
                        <label htmlFor='password'>Password</label>
                        <input required type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </span>
                    <span onClick={handleResetPassword} className='fpassword'>Forgot Password?</span>
                    <button className="enter" disabled={loading} >{loading ? "Loading" : "Sign In"}</button>
                    <span className="span">New to MovieWeb? <Link to='/signup'>Sign Up</Link></span>
                </form>
            </div>
            <Notification />
        </div>
    )
}

export default Login