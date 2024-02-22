
import { Link } from 'react-router-dom';
import Search from '../Search';
import '../Styles/Navbar.css';
import '../Styles/Login.css';
import NavbarLogin from '../NavbarLogin';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="topnav">
        <h1 className="page-title">Lessons Learned Central</h1>
        <div className="topnav-buttons">
        <Link to="/llc" className="aar">AAR</Link>
          <NavbarLogin className="tab" />
        </div>
      </h1>
        <Search className="search" />
    </nav>
  );
};