import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/contextAPI/App';
import _ from 'lodash';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

