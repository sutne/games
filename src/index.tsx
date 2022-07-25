import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";

import "./style/index.css";

import Main from "./pages/main";
import Minesweeper from "./pages/minesweeper";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="App">
      <Minesweeper />
    </div>
  </React.StrictMode>
);
