
import { Link } from 'react-router-dom';
import Search from '../Search';
import '../Styles/Navbar.css';
import '../Styles/Login.css';
import NavbarLogin from '../NavbarLogin';

export default function Navbar() {
  return (
    <nav className="navbar">
      <nav className="topnav">
        <h1 className="page-title">Lessons Learned Central</h1>
        <div className="topnav-buttons">
          <Search className="search" />
          <Link to="/llc" className="tab">AAR</Link>
          <NavbarLogin className="tab" />
        </div>
      </nav>
    </nav>
  );
};