import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Trophy, Gift, User } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { to: "/", label: "Bosh sahifa", icon: <Home size={22} /> },
    { to: "/leaderboard", label: "Reyting", icon: <Trophy size={22} /> },
    { to: "/rewards", label: "Sovg‘alar", icon: <Gift size={22} /> },
    { to: "/profile", label: "Profil", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-br from-yellow-700/20 via-yellow-800/30 to-yellow-900/40 backdrop-blur-lg border-t border-yellow-500/20 shadow-[0_0_25px_rgba(255,215,0,0.25)] flex justify-around items-center py-2 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `relative flex flex-col items-center transition-all duration-300 ease-in-out ${
              isActive
                ? "text-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                : "text-gray-400 hover:text-yellow-300 hover:scale-105"
            }`
          }
        >
          <div className="relative">
            {item.icon}
            {/* 🔹 Active glow circle */}
            <div
              className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
                location.pathname === item.to
                  ? "bg-yellow-400/40 scale-150"
                  : "scale-0"
              }`}
            ></div>
          </div>
          <span className="text-[11px] mt-1 font-medium tracking-wide">
            {item.label}
          </span>
          {/* 🔸 Active gold line indicator */}
          <div
            className={`absolute bottom-0 h-[3px] w-8 rounded-full transition-all duration-300 ${
              location.pathname === item.to
                ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                : "opacity-0"
            }`}
          ></div>
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
