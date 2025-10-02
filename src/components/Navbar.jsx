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
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around items-center py-2 border-t border-gray-700 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `relative flex flex-col items-center transition-all duration-200 ${
              isActive ? "text-cyan-400" : "text-gray-400 hover:text-cyan-300"
            }`
          }
        >
          {item.icon}
          <span className="text-[11px] mt-1">{item.label}</span>
          {({ isActive }) =>
            isActive && (
              <span className="absolute bottom-0 h-1 w-6 bg-cyan-400 rounded-full"></span>
            )
          }
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;