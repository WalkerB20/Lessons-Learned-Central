
//import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './styles/App.css';

function App() {
  return (

    <div className="App">
      <Navbar />
      <header className="App-header">
        <Home />
      </header>
      <Footer />
    </div>
  );
}

export default App;
