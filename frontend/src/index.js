import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Assuming this contains TailwindCSS setup
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap CSS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
