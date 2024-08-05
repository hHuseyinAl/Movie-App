import React, { useEffect, useState } from 'react'
import '../css/home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../components/MovieList';
import Notification from '../components/Notifications';

export const apiKey = import.meta.env.VITE_API_KEY;
export const baseUrl = "https://api.themoviedb.org/3/movie"
export const url = "https://api.themoviedb.org/3/movie/popular"
export const url2 = "https://image.tmdb.org/t/p/original"
export const url3 = "https://api.themoviedb.org/3/search/movie?query="

export const clip = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
}

function Home() {

    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        fetch(`${url}?api_key=${apiKey}&language=en-US`).then(res => res.json()).then(data => setPopularMovies(data.results))
    }, [])

    return (
        <div>
            <div className='poster'>
                <Carousel className='carousel' transitionTime={1000} autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
                    {popularMovies && popularMovies.map(movie => (
                        <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                            <div className='posterImage'>
                                <img src={`${url2}${movie && movie.backdrop_path}`} />
                            </div>
                            <div className='posterImage_overlay'>
                                <div className='posterImage_title'>
                                    {movie ? movie.original_title : ""}
                                </div>
                                <div className='posterImage_runtime'>
                                    {movie ? movie.release_date.replace(/-/g, ' / ') : ""} <span className='posterImage_rating'>{movie ? (movie.vote_average).toFixed(1) : ""} <i className='fa fa-star' /> {" "}</span>
                                </div>
                                <div className='posterImage_description'>
                                    {movie && clip((movie.overview), 420)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
                <MovieList />
                <Notification />
            </div>
        </div>
    )
}

export default Home