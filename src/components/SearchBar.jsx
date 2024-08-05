import { Box, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/searchBar.css'

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState("")
    
    const navigate = useNavigate()

    const handleSubmit =(e)=>{
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`)
            setSearchTerm("")
        }
    }
    return (
        <Box className='search_bar' component="form" onSubmit={handleSubmit} sx={{ borderRadius: 20, pl: 2, boxShadow: "none"}}>
            <input type="text" className='input' placeholder="Search Any Movie..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            <IconButton type="submit" className='search' sx={{p:"10px", color:"#fff"}}>
                <Search />
            </IconButton>
        </Box>
    )
}

export default SearchBar