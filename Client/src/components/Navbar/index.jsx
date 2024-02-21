import AAR from '../AAR';
import Search from '../Search';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <AAR />
      <Search />
    </nav>
  )
}

export default Navbar;