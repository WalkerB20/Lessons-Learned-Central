import React from 'react';
// import {StyledNavbar} from './Styles'
import Login from '../Login';
import Logout from '../Logout';
import '../styles/Login.css';

const NavbarLogin = () => {
  return (
    <>
      <Login/>
      <Logout/>
    </>
  )
}

export default NavbarLogin