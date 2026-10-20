// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

import 'modern-normalize';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
