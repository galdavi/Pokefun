import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import PokedexPage from "./pages/PokedexPage"
import PokemonDetails from "./pages/PokemonDetailsPage"
import MainLayout from "./layouts/MainLayout"


function App() {

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage/>}/>
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokemon-details/:pokemon?" element={<PokemonDetails/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
