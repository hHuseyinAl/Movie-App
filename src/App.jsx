import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import MovieList from './components/MovieList'
import Movie from './pages/Movie'
import SearchFeed from './components/SearchFeed'
import ScrollToTopButton from './components/ScrollToTopButton'
import Error from './pages/Error'
import CheckConnection from './components/CheckConnection'

function App() {

  return (
    <CheckConnection>
      <div className='app'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/movie/:id' element={<Movie />} />
            <Route path='/movies/:type' element={<MovieList />} />
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>
        <ScrollToTopButton />
      </div>
    </CheckConnection>
  )
}

export default App
