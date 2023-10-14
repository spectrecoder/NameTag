import "./App.css"
import Navbar from "./pages/navbar"
import Home from "./pages/home"
import MarketPlace from "./pages/marketplace"
import Character from "./pages/character"
import WhitePaper from "./pages/whitepaper"
import MyInventory from "./pages/myinventory"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <MarketPlace />
      <Character />
      <WhitePaper />
      <MyInventory />
    </div>
  )
}

export default App
