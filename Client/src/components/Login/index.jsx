import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import '../Styles/Login.css';

const Login = () => {
  const {isAuthenticated, loginWithPopup} = useAuth0()
 return(
   !isAuthenticated && (
   <button className="tab" onClick={() => loginWithPopup()}>
    Log in
   </button>
   )
 )
}

export default Login