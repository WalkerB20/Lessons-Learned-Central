import React from 'react';
// import {StyledNavbar} from './Styles'
import Login from '../Login';
import Logout from '../Logout';
import '../Styles/Login.css';
import '../Styles/Navbar.css';

const NavbarLogin = () => {
  return (
    <>
      <Login className="tab"/>
      <Logout className="tab"/>
    </>
  )
}

export default NavbarLogin