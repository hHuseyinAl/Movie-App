import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../css/header.css'
import SearchBar from './SearchBar'
import { BiCameraMovie } from "react-icons/bi";
import { LuMenu } from "react-icons/lu";
import { UserAuth } from '../context/AuthContext';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';

function Header() {

    const [menuOpen, setMenuOpen] = useState(false)

    window.addEventListener("resize", () => {
        setMenuOpen(false)
    })

    const handleDocumentClick = (e) => {
        if (menuOpen && !document.querySelector(".menu").contains(e.target)) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick)
        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [menuOpen])

    const { user, logOut } = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut()
            navigate("/")
            if (location.pathname === "/") {
                setTimeout(() => {
                    toast.success("Successfully Logged Out")
                }, 100);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='header-main'>
                <div className='header_top'>
                    {user?.email ? (
                        <>
                            <div className='header_info'>You Can Add/Remove A Movie In Your Profile Or Loguot</div>
                            <div className='user'>
                                <Link style={{ textDecoration: "none" }} to='/profile'>
                                    <Avatar sx={{ bgcolor: "#504a63", width: 36, height: 36, ":hover": { bgcolor: "#504a639e" } }} variant='rounded'>{(user?.email).substring(0, 2)}</Avatar>
                                </Link>
                                <Button onClick={handleLogout} variant="contained" color='error'>Logout</Button>
                            </div>
                        </>
                    ) :
                        (
                            <>
                                <div className='header_info'>Use Your Own Account To Benefit From Different Features</div>
                                <div className='user'>
                                    <Link to='/login'>
                                        <Button className='btn' variant="outlined" color='error' sx={{ color: "#fff", borderColor: "#fff" }}>Login</Button>
                                    </Link>
                                    <Link to='/signup'>
                                        <Button variant="contained" color='error'>SignUp</Button>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='header'>
                    <div className='left'>
                        <NavLink to="/" style={{ textDecoration: "none" }}><div className='home'>MovieWeb<BiCameraMovie className='logo' /></div></NavLink>
                    </div>
                    <div className='menu'>
                        <LuMenu onClick={() => setMenuOpen(!menuOpen)} />
                    </div>
                    <div className={menuOpen ? "open" : "center"} >
                        <NavLink to="/movies/now_playing" style={{ textDecoration: "none" }}><span>Now Playing</span></NavLink>
                        <NavLink to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></NavLink>
                        <NavLink to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></NavLink>
                        <NavLink to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></NavLink>
                    </div>
                    <div className='right'>
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header