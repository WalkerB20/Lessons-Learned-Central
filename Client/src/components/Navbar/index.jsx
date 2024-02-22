import AAR from '../AAR';
import Search from '../Search';
import '../Styles/Navbar.css';
import '../Styles/Login.css';
import NavbarLogin from '../NavbarLogin';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="topnav">
        <h1 className="page-title">Lessons Learned Central</h1>
        <div className="topnav-buttons">
          <AAR className="tab"/>
          <NavbarLogin className="tab" />
        </div>
      </h1>
        <Search className="search" />
    </nav>
  )
}

export default Navbar;