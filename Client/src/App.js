import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/Styles/App.css';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
import AARComponent from './components/AARComponent/index';
import NavbarLogin from './components/NavbarLogin/index';
import Home from './components/Home/index';

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavbarLogin />
          <Routes>
            <Route path="/aar" element={<AARComponent />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
      </div>
    </Router>
  );
}