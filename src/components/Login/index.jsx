import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
// import {Button} from './Styles';
//import './LoginButton.css';

export default function LoginButton() {
  const {isAuthenticated, loginWithPopup} = useAuth0()

  return(
    !isAuthenticated && (
    <button onClick={() => loginWithPopup()}>
      Log in
    </button>
    )
  )
}