import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import CVWizardPage from "./pages/CVWizardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/free-cv-builder" element={<CVWizardPage />} />
      <Route path="/wizard" element={<Navigate to="/free-cv-builder" replace />} />
      <Route
        path="/create-cv-online-free"
        element={<Navigate to="/free-cv-builder" replace />}
      />
      <Route
        path="/free-resume-generator"
        element={<Navigate to="/free-cv-builder" replace />}
      />
    </Routes>
  );
}
