import React from 'react';
// import {StyledNavbar} from './Styles'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './LoginButton.css';

const NavbarLogin = () => {
  return (
    <>
      <LoginButton/>
      <LogoutButton/>
    </>
  )
}

export default NavbarLogin