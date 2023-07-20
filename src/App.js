import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home';
import Navbar from './components/Navbar';
import PokemonCard from './components/PokemonCard';

function App() {
  return (
    <div>
      <Navbar />
      <PokemonCard />
    </div>    
  );
}

export default App;