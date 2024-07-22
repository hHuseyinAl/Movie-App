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
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

function App() {

  return (
    <CheckConnection>
      <AuthContextProvider>
        <div className='app'>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/movie/:id' element={<Movie />} />
              <Route path='/movies/:type' element={<MovieList />} />
              <Route path='/search/:searchTerm' element={<SearchFeed />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </BrowserRouter>
          <ScrollToTopButton />
        </div>
      </AuthContextProvider>
    </CheckConnection>
  )
}

export default App
