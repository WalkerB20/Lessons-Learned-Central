import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles/index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      > */}
    {/* <AppProvider> */}
          <App />
        {/* </AppProvider> */}
    {/* </Auth0Provider> */}
  </React.StrictMode>
);
