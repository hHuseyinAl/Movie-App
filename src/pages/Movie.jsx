import React, { useEffect, useState } from 'react'
import '../css/movie.css'
import { useParams } from 'react-router-dom'
import { apiKey, baseUrl, url2 } from './Home'
import image from '../assets/image5.png'
import Cast from '../components/Cast'
import '../css/moviePhotos.css'
import SimilarMovies from '../components/SimilarMovies'


function Movie() {

    const [currentMovieDetail, setCurrentMovieDetail] = useState()
    const [photos, setPhotos] = useState()
    const [credits, setCredits] = useState()
    const [similarMovies, setSimilarMovies] = useState()
    const { id } = useParams()

    const addHorizontalScrollListener = (selector) => {
        const scrollContainer = document.querySelector(selector);

        if (scrollContainer) {
            scrollContainer.addEventListener("wheel", (e) => {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
                scrollContainer.style.scrollBehavior = "auto";
            });
        }
    }

    addHorizontalScrollListener(".credits");
    addHorizontalScrollListener(".photos");
    addHorizontalScrollListener(".similarMovies");
    addHorizontalScrollListener(".movie_production");

    const fullPhoto = (photoPath) => {
        window.open(`${url2}${photoPath}`)
    }

    useEffect(() => {
        getData()
        getPhotos()
        getCreditsData()
        getSimilarMovies()
        window.scrollTo(0, 0)
    }, [])

    const getData = () => {
        fetch(`${baseUrl}/${id}?api_key=${apiKey}&language=en-US`).then(res => res.json()).then(data => setCurrentMovieDetail(data))
    }

    const getCreditsData = () => {
        fetch(`${baseUrl}/${id}/credits?api_key=${apiKey}&language=en-US`).then(res => res.json()).then(data => setCredits(data.cast))
    }

    const getPhotos = () => {
        fetch(`${baseUrl}/${id}/images?api_key=${apiKey}`).then(res => res.json()).then(data => setPhotos(data.backdrops))
    }

    const getSimilarMovies = () => {
        fetch(`${baseUrl}/${id}/similar?api_key=${apiKey}`).then(res => res.json()).then(data => setSimilarMovies(data.results))
    }

    return (
        <div>
            <div className='movie'>
                <div className='movie_intro'>
                    <img className='movie_backdrop' src={currentMovieDetail && currentMovieDetail.backdrop_path ? `${url2}${currentMovieDetail.backdrop_path}` : image} />
                </div>
                <div className='movie_detail'>
                    <div className='movie_detailLeft'>
                        <div className='movie_posterBox'>
                            <img className='movie_poster' src={currentMovieDetail && currentMovieDetail.poster_path ? `${url2}${currentMovieDetail.poster_path}` : image} />
                        </div>
                    </div>
                    <div className='movie_detailRight'>
                        <div className='movie_detailRightTop'>
                            <div className='movie_name'>
                                {currentMovieDetail ? currentMovieDetail.original_title : ""}
                            </div>
                            <div className='movie_tagline'>
                                {currentMovieDetail ? currentMovieDetail.tagline : ""}
                            </div>
                            <div className='movie_rating'>
                                {currentMovieDetail ? (currentMovieDetail.vote_average).toFixed(1) : ""} <i className='fa fa-star' />
                                <span className='movie_voteCount'>{" "}{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                            </div>
                            <div className='movie_runtime'>
                                {currentMovieDetail && currentMovieDetail.runtime ? currentMovieDetail.runtime + " Mins" : "Mins: unknown"}
                            </div>
                            <div className='movie_releaseDate'>
                                {currentMovieDetail && currentMovieDetail.release_date ? "Release Date: " + currentMovieDetail.release_date.replace(/-/g, ' / ') : "Release Date: unknown"}
                            </div>
                            <div className='movie_genres'>
                                {currentMovieDetail && currentMovieDetail.genres ? currentMovieDetail.genres.map(genre => (
                                    <span key={genre.id} className='movie_genre' id={genre.id}>{genre.name}</span>
                                )) : ""}
                            </div>
                        </div>
                        <div className='movie_detailRightBottom'>
                            <div className='synopsisText'>Synopsis</div>
                            <div className='movie_overview'>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                        </div>
                    </div>
                </div>
                <div className='movie_links'>
                    {(currentMovieDetail && (currentMovieDetail.homepage || currentMovieDetail.imdb_id)) && (
                        <div className='movie_heading'>Useful Link(s)</div>
                    )}
                    {currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie_homeButton movie_Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>}
                    {currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie_imdbButton movie_Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>}
                </div>
                {currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.length > 0 && (
                    <>
                        <div className='movie_heading'>Production Companies</div>
                        <div className='movie_production'>
                            {currentMovieDetail.production_companies.map(company => (
                                <div key={company.id}>
                                    {(company.logo_path || company.name) && (
                                        <div className='productionCompanyImage'>
                                            <img className='movie_productionCompany' src={company.logo_path ? `${url2}${company.logo_path}` : image} />
                                            <p>{company.name}</p>
                                        </div>)}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div>
                {photos && photos.length > 0 && (
                    <div className='photo_list'>
                        <h1 className='photo_title'>Photos</h1>
                        <div className='photos'>
                            {photos && photos.map((photo, index) => (
                                <img onClick={() => fullPhoto(photo.file_path)} key={index} className='poster_photos' src={photo && photo.file_path ? `${url2}${photo.file_path}` : ""} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div>
                {credits && credits.length > 0 && (
                    <div className='cast_list'>
                        <h1 className='list_title'>Cast</h1>
                        <div className='credits'>
                            {credits && credits.map(credit => (
                                <Cast key={credit.id} credit={credit} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div>
                {similarMovies && similarMovies.length > 0 && (
                    <div className='similar_movielist'>
                        <h1 className='similarmovie_title'>Similar Movies</h1>
                        <div className='similarMovies'>
                            {similarMovies && similarMovies.map(similarMovie => (
                                <SimilarMovies key={similarMovie.id} similarMovie={similarMovie} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Movie