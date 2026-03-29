import React from 'react';
import ReactDOM from 'react-dom/client'; // 1. Added '/client'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(<App />);