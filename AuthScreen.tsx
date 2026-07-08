import React, { useState } from "react";
import { ScreenType, User } from "../types";
import { Leaf, Mail, Lock, User as UserIcon, ArrowRight, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import { INITIAL_USER } from "../data";

interface AuthScreenProps {
  loginUser: (user: User) => void;
  setScreen: (screen: ScreenType) => void;
}

export default function AuthScreen({ loginUser, setScreen }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isLogin) {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }
      // Log in with matching credentials or fall back to mock user
      const user: User = {
        ...INITIAL_USER,
        email: email,
        name: email.split("@")[0].split(".").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") || "John Doe",
      };
      setSuccess("Welcome back! Redirecting to dashboard...");
      setTimeout(() => {
        loginUser(user);
        setScreen(ScreenType.DASHBOARD);
      }, 1000);
    } else {
      if (!name || !email || !password) {
        setError("All fields are required to create an account.");
        return;
      }
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: name,
        email: email,
        ecoPoints: 500, // Initial sign-on reward
        totalSorted: 0,
        streak: 1,
        tier: "Bronze",
        role: "USER"
      };
      setSuccess("Account registered! +500 EcoPoints bonus added.");
      setTimeout(() => {
        loginUser(newUser);
        setScreen(ScreenType.DASHBOARD);
      }, 1200);
    }
  };

  const handleInstantDemo = (role: "USER" | "ADMIN") => {
    const demoUser: User = {
      ...INITIAL_USER,
      role: role,
      name: role === "ADMIN" ? "Admin Moderator" : "John Doe",
      email: role === "ADMIN" ? "admin@ecosense.org" : "john.doe@ecosense.org",
      tier: role === "ADMIN" ? "Platinum" : "Emerald"
    };
    setSuccess(`Entering simulator as ${role}...`);
    setTimeout(() => {
      loginUser(demoUser);
      setScreen(role === "ADMIN" ? ScreenType.ADMIN : ScreenType.DASHBOARD);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#f1f5f9]">
      {/* Left side panel: Environmental graphics and branding */}
      <div className="md:w-1/2 bg-slate-900 text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1000&auto=format&fit=crop&q=80"
            alt="Eco city background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/60 z-10"></div>

        <div className="relative z-20">
          <div className="flex items-center space-x-2.5">
            <div className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-2 rounded-xl text-white">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight">EcoSense</span>
          </div>
        </div>

        <div className="my-auto relative z-20 py-12 md:py-0">
          <span className="text-[#8b5cf6] font-mono font-bold text-xs tracking-wider uppercase block mb-3">
            LOGISTICS & STEWARDSHIP
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Intelligent stewardship for a cleaner world.
          </h2>
          <p className="mt-4 text-slate-300 text-xs sm:text-sm max-w-md font-medium leading-relaxed">
            Connect high-precision bin sensors, AI categorization, and municipal rewards in a single integrated console.
          </p>

          <div className="mt-8 flex items-center space-x-4 bg-slate-950/50 border border-slate-800/80 p-4.5 rounded-2xl max-w-sm">
            <div className="bg-[#6366f1] p-2 rounded-xl text-white">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Carbon Reduction</p>
              <p className="text-[11px] text-[#8b5cf6] font-bold font-mono">-24% this month in Sector B-4</p>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-slate-500 text-xs font-mono">
          © {new Date().getFullYear()} EcoSense Network. All telemetry encrypted.
        </div>
      </div>

      {/* Right side panel: Auth form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-12 relative">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] mt-2 font-medium">
              {isLogin 
                ? "Enter your credentials to manage telemetry or claim EcoPoints." 
                : "Join the EcoSense network to log disposals and claim rewards."}
            </p>
          </div>

          {/* Instant Simulator Demo Logins (Highlight for easy testing) */}
          <div className="mb-6 p-4.5 bg-[#6366f1]/5 border border-[#6366f1]/10 rounded-[24px]">
            <p className="text-xs font-bold text-[#6366f1] uppercase tracking-wide flex items-center">
              <Sparkles className="h-3 w-3 mr-1.5 text-[#6366f1]" />
              Developer Simulator Quick-Launch
            </p>
            <p className="text-[11px] text-[#64748b] mt-1 font-medium">
              Bypass registration to test full-stack features, real-time telemetry dashboard, and AI sorting logic.
            </p>
            <div className="mt-3.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleInstantDemo("USER")}
                className="flex items-center justify-center space-x-1 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                id="demo-login-user"
              >
                <span>Demo User Log</span>
                <ArrowRight className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => handleInstantDemo("ADMIN")}
                className="flex items-center justify-center space-x-1 py-2.5 px-3 bg-[#1e293b] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                id="demo-login-admin"
              >
                <span>Demo Admin Panel</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] uppercase font-mono font-bold">or use credentials</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex items-start space-x-2 text-xs">
                <AlertCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-[#6366f1]/5 border border-[#6366f1]/10 text-[#6366f1] rounded-xl flex items-start space-x-2 text-xs">
                <CheckCircle className="h-4 w-4 text-[#6366f1] flex-shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <UserIcon className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]"
                    id="auth-name-input"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@ecosense.org"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]"
                  id="auth-email-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]"
                  id="auth-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6366f1] hover:bg-[#5046e5] text-white font-bold py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
              id="auth-submit-btn"
            >
              {isLogin ? "Sign In" : "Register Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-500">
              {isLogin ? "Don't have an account?" : "Already registered?"}
            </span>{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
              className="text-[#6366f1] hover:text-[#5046e5] font-bold transition-all"
              id="auth-toggle-mode"
            >
              {isLogin ? "Sign Up" : "Login Instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
