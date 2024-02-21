
import './components/Styles/App.css';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
import Home from './components/Home/index.jsx';
import NavbarLogin from './components/NavbarLogin/index.jsx';

function App() {
  return (
    <div className='App'>
      <NavbarLogin />
      <Home />
    </div>
  );
}

export default App;
