import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/index.css";

import Main from "./pages/main";
import Minesweeper from "./pages/minesweeper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/games" element={<Main />} />
          <Route path="/games/minesweeper" element={<Minesweeper />} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
