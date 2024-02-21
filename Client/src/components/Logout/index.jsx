import React from 'react';
import '../styles/Login.css';
import {useAuth0} from '@auth0/auth0-react';

export default function Logout() {
  const {isAuthenticated, logout} = useAuth0()

  return(

    isAuthenticated && (
    <button onClick={() => logout()}>
        Log Out
    </button>
    )
  )
}