import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import './LoginButton.css';

const LoginButton = () => {
  const {isAuthenticated, loginWithPopup} = useAuth0()
 return(
   !isAuthenticated && (
   <button onClick={() => loginWithPopup()}>
    Log in
   </button>
   )
 )
}

export default LoginButton