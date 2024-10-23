import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
const client = generateClient();
Amplify.configure(config);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    
    <App />

  </React.StrictMode>
);