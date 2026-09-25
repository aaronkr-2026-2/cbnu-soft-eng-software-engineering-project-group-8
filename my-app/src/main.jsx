import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../frontend/homepage.jsx";
import Detect from "../frontend/detect.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="*" element={<main style={{ padding: 40 }}>Không tìm thấy trang. <a href="/">Về trang chủ</a></main>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
