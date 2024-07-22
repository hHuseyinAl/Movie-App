import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import '../css/profile.css'
import Card from '../components/Card'

function Profile() {
    const [movies, setMovies] = useState([])

    const { user } = UserAuth()

    useEffect(() => {
        if (user) {
            onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
                if (doc.data()) setMovies(doc.data().favMovies)
            })
        }
    }, [user?.email])

    return (
        <div>
            <div className='fav_list'>
                {movies.length === 0 ? <h2 className='fav_list_title'>No favourite movie in profile </h2> : <h2 className='fav_list_title'>Favourite movies:</h2>}
                <div className='mail'>{user.email}</div>
                <div className='fav_list_cards'>
                    {movies && movies.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile