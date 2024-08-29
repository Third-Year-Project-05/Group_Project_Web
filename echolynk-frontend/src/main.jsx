import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loadPayHereScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load PayHere SDK'));
    document.body.appendChild(script);
  });
};

const Main = () => {
  useEffect(() => {
    loadPayHereScript().then(() => {
      // PayHere SDK is now loaded
      console.log('PayHere SDK loaded');
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
