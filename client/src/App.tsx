import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import PokedexPage from "./pages/PokedexPage"
import PokemonDetails from "./pages/PokemonDetailsPage"


function App() {

  return (
    <div className="min-h-screen w-full">
      <Routes>

        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage/>}/>
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokemon-details/:pokemon?" element={<><PokemonDetails/></>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
