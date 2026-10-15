import AuthProvider from "../frontend/auth-provider.jsx";
import Login from "../frontend/login.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../frontend/homepage.jsx";
import Detect from "../frontend/detect.jsx";
import StudyPlanner from "../frontend/study-planner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/study-planner" element={<StudyPlanner />} />
        <Route path="*" element={<main style={{ padding: 40 }}>Page not found. <a href="/">Back to home</a></main>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
