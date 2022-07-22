import React from "react";
import ReactDOM from "react-dom/client";

import "./style/index.css";
import logo from "./assets/logo.svg";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Im just setting things up to make sure my stack works as intended.
        </p>
        <p>Stay Tuned for actual games here.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to test page
        </a>
      </header>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
