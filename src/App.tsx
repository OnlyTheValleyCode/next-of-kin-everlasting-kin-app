import React, { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { LoginPopup, SignupPopup } from "./components/AuthPopups";
import { Dashboard } from "./components/Dashboard";
import { SearchPopup } from "./components/SearchPopup";
import { NotificationToasts } from "./components/NotificationToasts";
import logo from "../public/logo-everlasting-kin.svg";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popup, setPopup] = useState<null | "login" | "signup" | "search">(null);

  return (
    <div className="min-h-screen bg-[color:var(--ek-bg-main)] text-[color:var(--ek-text-main)]">
      {/* Top bar */}
      <div className="flex items-center p-4 justify-between">
        <img src={logo} alt="Everlasting Kin" className="w-48 h-16" />
        <div className="flex items-center space-x-4">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="text-2xl hover:scale-125 transition"
          >
            <span role="img" aria-label="shield">🛡️</span>
            <span role="img" aria-label="police">👮‍♂️</span>
          </button>
          {menuOpen && (
            <div className="absolute right-4 top-16 z-50 bg-[color:var(--ek-bg-main)] border rounded-lg shadow-lg p-4 flex flex-col space-y-2 transition-all">
              <button onClick={() => setPopup("login")}>Admin/Police Login</button>
              <button onClick={() => setPopup("signup")}>Register Staff/Police</button>
            </div>
          )}
        </div>
      </div>

      {/* Main landing */}
      <div className="flex flex-col items-center py-12 space-y-6">
        <h1 className="text-4xl font-bold tracking-wide mb-2">Welcome to Everlasting Kin</h1>
        <p className="text-lg max-w-xl text-center">
          Search for lost loved ones, help connect families, and manage cases with dignity, security, and care.
        </p>
        <div className="flex space-x-4">
          <button className="btn-accent" onClick={() => setPopup("search")}>Public Search</button>
          <button className="btn-muted" onClick={() => setPopup("signup")}>Sign Up</button>
          <button className="btn-muted" onClick={() => setPopup("login")}>Login</button>
        </div>
      </div>
      <Dashboard />
      {/* Popups */}
      {popup === "login" && <LoginPopup onClose={() => setPopup(null)} />}
      {popup === "signup" && <SignupPopup onClose={() => setPopup(null)} />}
      {popup === "search" && <SearchPopup onClose={() => setPopup(null)} />}
      <NotificationToasts />
    </div>
  );
}