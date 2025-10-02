import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Trophy, Gift, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white flex justify-around items-center py-3 border-t border-gray-700">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-cyan-400" : "text-gray-400"}`}
      >
        <Home size={22} />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink 
        to="/leaderboard" 
        className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-cyan-400" : "text-gray-400"}`}
      >
        <Trophy size={22} />
        <span className="text-xs">Leaderboard</span>
      </NavLink>

      <NavLink 
        to="/rewards" 
        className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-cyan-400" : "text-gray-400"}`}
      >
        <Gift size={22} />
        <span className="text-xs">Rewards</span>
      </NavLink>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-cyan-400" : "text-gray-400"}`}
      >
        <User size={22} />
        <span className="text-xs">Profile</span>
      </NavLink>
    </div>
  );
};

export default Navbar;
