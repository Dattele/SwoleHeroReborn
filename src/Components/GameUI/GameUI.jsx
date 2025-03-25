import React from "react";

import { useDanny } from "../../Context/DannyContext";

export default function GameUI({
  showMenu = true,
  showGold = true,
  onMenuOpen,
  children
}) {
  const { gold } = useDanny();

  return (
    <div className="relative w-full h-full">
      {children}

      {/* Top-right menu button */}
      {showMenu && (
        <button
          className="btn absolute top-4 right-4 z-50"
          onClick={onMenuOpen}
        >
          ☰ Menu
        </button>
      )}

      {/* Gold display (optional) */}
      {showGold && (
        <div className="absolute top-4 left-4 z-50 bg-yellow-200 px-3 py-1 rounded shadow">
          💰 {gold} Gold
        </div>
      )}

      {/* Could add other floating UI here */}
    </div>
  );
};