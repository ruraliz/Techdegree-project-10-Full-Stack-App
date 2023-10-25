import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './App';
import './styles/global.css'
import './styles/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);


