import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/Styles/App.css';
import Footer from './components/Footer/index.jsx';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
import AARComponent from './components/AARComponent/index.jsx';
import NavbarLogin from './components/NavbarLogin/index.jsx';
import Home from './components/Home/index.jsx';
import About from './components/About/index.jsx';

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavbarLogin />
          <Routes>
            <Route path="/llc" element={<AARComponent />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
      </div>
    </Router>
  );
}