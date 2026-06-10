import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import PokedexPage from "./pages/PokedexPage"


function App() {

  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/pokedex" element={<><Navbar/><PokedexPage/></>}/>
      </Routes>
    </div>
  )
}

export default App
