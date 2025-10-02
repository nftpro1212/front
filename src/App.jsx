import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
