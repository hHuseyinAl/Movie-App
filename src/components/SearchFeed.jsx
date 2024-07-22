import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiKey, url3 } from '../pages/Home'
import '../css/movieList.css'
import Card from './Card'

function SearchFeed() {

    const [movies, setMovies] = useState([])
    const { searchTerm } = useParams()

    useEffect(() => {
        fetch(`${url3}${searchTerm}&api_key=${apiKey}&include_adult=false&language=en-US`).then(res => res.json()).then(data => setMovies(data.results))
    }, [searchTerm])

    return (
        <div>
            <div className='movie_list'>
                {movies.length === 0 ? <h2 className='list_title'>The Movie You Searched Was Not Found!!!<br />Try Something Else...</h2> : <h2 className='list_title'>Search Results for: {searchTerm}</h2>}
                <div className='list_cards'>
                    {movies && movies.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchFeed