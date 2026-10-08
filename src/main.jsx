import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Existing application logic is intentionally kept unchanged.
// It still owns the DOM behavior, API calls, storage, OTP flow, etc.
import './main.js';

createRoot(document.getElementById('root')).render(<App />);
