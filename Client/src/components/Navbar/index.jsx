
import { Link } from 'react-router-dom';
import Search from '../Search';
import '../Styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/aar" className="aar">AAR</Link>
        <Search />
    </nav>
  );
};