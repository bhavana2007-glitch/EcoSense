import React from "react";
import { ScreenType, User } from "../types";
import { Leaf, Search, Bell, Menu, X, ShieldAlert, Award, LogOut } from "lucide-react";

interface NavbarProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  user: User | null;
  logout: () => void;
  toggleRole: () => void;
}

export default function Navbar({ currentScreen, setScreen, user, logout, toggleRole }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: "Dashboard", screen: ScreenType.DASHBOARD, authRequired: true },
    { name: "Classify", screen: ScreenType.CLASSIFIER, authRequired: true },
    { name: "Rewards", screen: ScreenType.REWARDS, authRequired: true },
    { name: "Leaderboard", screen: ScreenType.LEADERBOARD, authRequired: true },
    { name: "Alerts", screen: ScreenType.ALERTS, authRequired: true },
    { name: "Admin", screen: ScreenType.ADMIN, authRequired: true, adminOnly: true }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => setScreen(user ? ScreenType.DASHBOARD : ScreenType.LANDING)}
              className="flex items-center space-x-2.5 cursor-pointer focus:outline-hidden"
              id="nav-logo"
            >
              <div className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-2 rounded-xl text-white shadow-sm flex items-center justify-center">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                EcoSense
              </span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1.5">
            {user &&
              navLinks
                .filter(link => !link.adminOnly || user.role === "ADMIN")
                .map((link) => {
                  const isActive = currentScreen === link.screen;
                  return (
                    <button
                      key={link.name}
                      onClick={() => setScreen(link.screen)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-[#1e293b] text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                      id={`nav-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </button>
                  );
                })}
          </div>

          {/* Right Header Section (Search, Alerts, Points, User Profile) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Points Pill */}
                <div 
                  onClick={() => setScreen(ScreenType.REWARDS)}
                  className="flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-100/70 px-3 py-1.5 rounded-full text-amber-800 cursor-pointer transition-colors"
                  title="Your Reward Points Balance"
                  id="nav-points-badge"
                >
                  <Award className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold font-mono">{user.ecoPoints.toLocaleString()}</span>
                  <span className="text-xs font-semibold">pts</span>
                </div>

                {/* Role Switch Tooltip */}
                <button
                  onClick={toggleRole}
                  className="flex items-center space-x-1 text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  title="Switch between User and Admin simulator roles"
                  id="nav-role-switcher"
                >
                  <ShieldAlert className="h-3 w-3 text-slate-500" />
                  <span>Role: {user.role}</span>
                </button>

                {/* Notification Bell */}
                <button 
                  onClick={() => setScreen(ScreenType.ALERTS)}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full relative cursor-pointer"
                  id="nav-notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* User Info & Logout (Styled as a Profile Chip) */}
                <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/60 p-1.5 pr-3.5 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-[#6366f1] font-bold leading-none mt-0.5 uppercase tracking-wider">{user.tier} Tier</p>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer ml-1"
                    title="Log Out"
                    id="nav-logout-btn"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setScreen(ScreenType.AUTH)}
                  className="text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-2 cursor-pointer"
                  id="nav-login-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setScreen(ScreenType.AUTH)}
                  className="bg-[#1e293b] hover:bg-slate-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  id="nav-register-btn"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <div 
                onClick={() => setScreen(ScreenType.REWARDS)}
                className="mr-3 flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-full text-amber-800 cursor-pointer"
              >
                <Award className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold font-mono">{user.ecoPoints}</span>
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-2 pt-2 pb-4 space-y-1">
          {user ? (
            <>
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                <p className="text-xs text-emerald-600 font-medium">{user.tier} Tier • Role: {user.role}</p>
              </div>
              {navLinks
                .filter(link => !link.adminOnly || user.role === "ADMIN")
                .map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setScreen(link.screen);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                      currentScreen === link.screen
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    id={`mobile-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                ))}
              <div className="pt-4 border-t border-gray-100 mt-2 flex justify-between px-3">
                <button
                  onClick={toggleRole}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Toggle Simulator Role
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-medium flex items-center space-x-1"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 px-2 space-y-2">
              <button
                onClick={() => {
                  setScreen(ScreenType.AUTH);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-center py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setScreen(ScreenType.AUTH);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-center bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow-xs"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
