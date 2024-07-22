import React, { useEffect, useState } from 'react'
import '../css/card.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'
import { url2 } from '../pages/Home'
import cardImage from '../assets/image4.jpg'

function Card({ movie }) {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])

    return (
        <>
            {isLoading ?
                <div className='cards'>
                    <SkeletonTheme baseColor='#30197d' highlightColor='#504a63'>
                        <Skeleton count={2} height={300} duration={0.5} />
                    </SkeletonTheme>
                </div> :
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                    <div className='cards'>
                        <img src={movie && movie.poster_path ? `${url2}${movie.poster_path}` : cardImage} className='cards_img' />
                        <div className='cards_overlay'>
                            <div className='card_title'>
                                {movie ? movie.original_title : ""}
                            </div>
                            <div className='card_runtime'>
                                <span>{movie ? (movie.release_date).substring(0, 4) : ""}</span>
                                <span className='card_rating'>{movie ? (movie.vote_average).toFixed(1) : ""} <i className='fa fa-star' /> {" "}</span>
                            </div>
                            <div className='card_description'>
                                {movie ? movie.overview.slice(0, 100) + "..." : ""}
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}

export default Card