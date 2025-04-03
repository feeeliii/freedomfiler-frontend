// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./tailwind.css";
import Login from "./components/pages/Login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import ReasonsOfDenial from "./components/pages/ReasonsOfDenial.jsx";
import TextBlocks from "./components/pages/TextBlocks.jsx"; 
import Summary from "./components/pages/Summary.jsx";
import Download from "./components/pages/Download.jsx";
import Test from "./components/pages/Test.jsx";
import Layout from "./components/layout/Layout.jsx";
import LoginZwei from "./components/pages/LoginZwei.jsx";


console.log("Main.jsx is running");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/neue-klage" element={<ReasonsOfDenial />} />
          <Route path="/text-blocks" element={<TextBlocks />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/download" element={<Download />} />
          <Route path="/test" element={<Test />} />
          <Route path="/loginzwei" element={<LoginZwei />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
