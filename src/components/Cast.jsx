import React from 'react'
import { url2 } from '../pages/Home'
import '../css/movie.css'
import '../css/cast.css'
import image from '../assets/image5.png'

function Cast({ credit }) {
    return (
        <div>
                <div className='cast_image'>
                    <img className='person_image' src={credit && credit.profile_path ? `${url2}${credit.profile_path}` : image} />
                </div>
                <div className='cast_names'>
                    <span>{credit ? credit.original_name : ""}</span>
                    <span>{credit ? credit.character : ""}</span>
                </div>
        </div>
    )
}

export default Cast