import React, { useEffect, useState } from 'react'
import '../css/movieList.css'
import { useParams } from 'react-router-dom'
import { apiKey, baseUrl } from '../pages/Home'
import Card from './Card'

function MovieList() {

    const [movieList, setMovieList] = useState([])
    const [page, setPage] = useState(1)
    const { type } = useParams()

    useEffect(() => {
        setPage(1);
        setMovieList([]);
    }, [type]);

    useEffect(() => {
        getData()
    }, [type, page])

    const getData = () => {
        fetch(`${baseUrl}/${type ? type : "popular"}?api_key=${apiKey}&language=en-US&page=${page}`).then(res => res.json()).then(data => {
            const newData = data.results.filter(movie => {
                return !movieList.find(existingMovie => existingMovie.id === movie.id);
            });
            setMovieList(prevMovieList => [...prevMovieList, ...newData]);
        })
    }

    const pageIncrease = () => {
        setPage(prevPage => prevPage + 1)
    }

    return (
        <div>
            <div className='movie_list'>
                <h2 className='list_title'>{(type ? type : "POPULAR").toUpperCase()} MOVİES</h2>
                <div className='list_cards'>
                    {movieList && movieList.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
                {movieList && movieList.length > 0 && (
                    <div className='button_wrapper'>
                        <div className='container'>
                            <button onClick={pageIncrease} className='button' type='button'>Show More</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieList