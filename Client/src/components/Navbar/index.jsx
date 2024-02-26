
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search';
import '../Styles/Navbar.css';
import '../Styles/Login.css';
import '../Styles/index.css';
import NavbarLogin from '../NavbarLogin';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <nav className="topnav">
        <Link to="/" className="page-title">Lessons Learned Central</Link>
        <div className="topnav-buttons">
          <Link to="/llc" className="tab">AAR</Link>
          <NavbarLogin className="tab" />
        </div>
      </nav>
      {location.pathname === '/' && <Search className="search" />}
    </nav>
  );
};