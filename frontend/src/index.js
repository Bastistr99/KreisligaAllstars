import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Mannschaft from "./components/Mannschaft";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mannschaft" element={<Mannschaft />} />
        <Route path="/players" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
