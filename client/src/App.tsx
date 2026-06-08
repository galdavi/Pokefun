import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"


function App() {

  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/pokedex" />
      </Routes>
    </div>
  )
}

export default App
