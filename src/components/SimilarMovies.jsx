import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../css/similarMovies.css'
import { Link, useParams } from 'react-router-dom'
import { url2 } from '../pages/Home'
import cardImage from '../assets/image4.jpg'

function SimilarMovies({ similarMovie }) {
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()

    const handleClick = () => {
        window.location.replace(`/movie/${similarMovie.id}`)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [id])

    useEffect(() => {
        const handlePopstate = () => {
            window.location.reload();
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    return (
        <>
            {isLoading ?
                <div className='movie_cards'>
                    <SkeletonTheme baseColor='#30197d' highlightColor='#504a63'>
                        <Skeleton count={2} height={300} duration={0.5} />
                    </SkeletonTheme>
                </div> :
                <Link to={`/movie/${similarMovie.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                    <div className='movie_cards' onClick={handleClick}>
                        <img src={similarMovie && similarMovie.poster_path ? `${url2}${similarMovie.poster_path}` : cardImage} className='movie_cards_img' />
                        <div className='movie_cards_overlay'>
                            <div className='movie_card_title'>
                                {similarMovie ? similarMovie.original_title : ""}
                            </div>
                            <div className='movie_card_runtime'>
                                <span>{similarMovie ? (similarMovie.release_date).substring(0, 4) : ""}</span>
                                <span className='movie_card_rating'>{similarMovie ? (similarMovie.vote_average).toFixed(1) : ""} <i className='fa fa-star' /> {" "}</span>
                            </div>
                            <div className='movie_card_description'>
                                {similarMovie ? similarMovie.overview.slice(0, 100) + "..." : ""}
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}

export default SimilarMovies