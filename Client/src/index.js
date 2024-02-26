import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/Styles/index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
        >
            <App />
      </Auth0Provider>
    </React.StrictMode>
  </Router>
);
