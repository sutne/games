import { App } from 'pages/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

document.body.style.margin = '0px';
document.body.style.fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
