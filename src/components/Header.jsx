import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/header.css'
import SearchBar from './SearchBar'
import { BiCameraMovie } from "react-icons/bi";
import { LuMenu } from "react-icons/lu";

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


    return (
        <div>
            <div className='header-main'>
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