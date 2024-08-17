import React, { useState } from 'react'
import '../css/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Notification from '../components/Notifications'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

function SignUp() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { createDoc } = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                navigate("/")
                await createDoc(email)
                if (location.pathname === "/") {
                    setTimeout(() => {
                        toast.success("Successfully Logged In")
                    }, 100);
                }
                setLoading(false)
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('E-mail Already In Use')
                } else if (error.code === 'auth/weak-password') {
                    toast.error("Weak Password")
                    setPassword("")
                } else if (error.code === 'auth/invalid-email') {
                    toast.error("Invalid Email")
                    setEmail("")
                    setPassword("")
                }
                setLoading(false)
            })
    }

    return (
        <div className='signup'>
            <div className='signup_border'>
                <h1>Sign Up</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <span className="input-span">
                        <label className='email_label' htmlFor='email'>Email <span>e.g. user@user.com</span></label>
                        <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </span>
                    <span className="input-span">
                        <label className='password_label' htmlFor='password'>Password <span>e.g. 123456</span></label>
                        <input required type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </span>
                    <button className="submit" disabled={loading} >{loading ? "Loading" : "Sign Up"}</button>
                    <span className="span">Already subscribed to MovieWeb <Link to='/login'>Sign In</Link></span>
                </form>
            </div>
            <Notification />
        </div>
    )
}

export default SignUp