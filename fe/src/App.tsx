import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientPage from './Views/ClientPage';
import DashboardPage from './Views/DashboardPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<ClientPage />} />
      </Routes>
  </Router>
  );
}

export default App;
