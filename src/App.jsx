
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './components/HomePage'
import Explore from './pages/Explore'
import Upgrade from './pages/Upgrade'
import Library from './pages/Library'
import PlayerPage from './components/PlayerPage'
import LibrayPage from './components/LibrayPage'
import ArtistDetails from './components/ArtistDetails'
import SearchPage from './components/SearchPage'

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Layout route as parent */}
        <Route path='/' element={ <Layout />}>
          {/* Nested child routes */}
          <Route index element={ <HomePage />} />
          <Route path='explore' element={<Explore />} />
          <Route path='upgrade' element={<Upgrade />} />
          <Route path='library' element={<Library />} />
          <Route path='/songs/:id' element={<PlayerPage />} />
          <Route path ='/artists/:id' element={<ArtistDetails />} />
          <Route path='/librarypage/:id' element={<LibrayPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
