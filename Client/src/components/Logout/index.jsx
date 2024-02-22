import React from 'react';
import '../Styles/Login.css';
import {useAuth0} from '@auth0/auth0-react';

export default function Logout() {
  const {isAuthenticated, logout} = useAuth0()

  return(

    isAuthenticated && (
    <button className="tab" onClick={() => logout()}>
        Log Out
    </button>
    )
  )
}