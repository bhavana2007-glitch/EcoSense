import React from "react";
import { ScreenType, User, ActivityLog, BinStatus } from "../types";
import { 
  Award, BarChart3, Clock, AlertTriangle, ArrowRight, Sparkles, Plus, 
  Trash2, ShieldCheck, ChevronRight, CheckCircle2, TrendingUp, Calendar
} from "lucide-react";

interface DashboardScreenProps {
  user: User;
  setScreen: (screen: ScreenType) => void;
  activities: ActivityLog[];
  bins: BinStatus[];
}

export default function DashboardScreen({ user, setScreen, activities, bins }: DashboardScreenProps) {
  // Filter active alerts in bins
  const activeAlertBins = bins.filter(b => b.isAlertActive);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6 mb-8">
        <div>
          <span className="text-[#6366f1] font-mono text-xs font-bold uppercase tracking-widest bg-[#6366f1]/10 px-3 py-1 rounded-full">
            Enterprise Console
          </span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 mt-2.5">
            Welcome back, {user.name}
          </h1>
          <p className="text-sm text-[#64748b] mt-1 font-medium">
            Here is your circular economy footprint and active municipal telemetry.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setScreen(ScreenType.CLASSIFIER)}
            className="flex items-center space-x-2 bg-[#6366f1] hover:bg-[#5046e5] text-white px-4.5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md cursor-pointer"
            id="dash-classify-btn"
          >
            <Plus className="h-4 w-4" />
            <span>Classify New Waste</span>
          </button>
          <button
            onClick={() => setScreen(ScreenType.ALERTS)}
            className="flex items-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4.5 py-2.5 rounded-xl font-bold text-sm shadow-xs transition-colors cursor-pointer"
            id="dash-alerts-btn"
          >
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Active Alerts ({activeAlertBins.length})</span>
          </button>
        </div>
      </div>

      {/* Main Stats Bento Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Points Card (Bento Highlight Gradient) */}
        <div className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden min-h-[200px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-wider text-white/80 font-bold">EcoPoints Balance</span>
              <div className="bg-white/20 p-2 rounded-xl text-white">
                <Award className="h-5 w-5 fill-white text-white" />
              </div>
            </div>
            <p className="font-display text-5xl font-extrabold tracking-tight text-white mt-4">
              {user.ecoPoints.toLocaleString()}
            </p>
            <p className="text-xs text-indigo-100 font-bold mt-2.5 flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+12% earned this week</span>
            </p>
          </div>
          <button 
            onClick={() => setScreen(ScreenType.REWARDS)}
            className="mt-6 flex items-center space-x-1 text-xs font-bold text-white hover:text-indigo-100 text-left cursor-pointer border-t border-white/10 pt-3"
          >
            <span>Redeem Points Balance</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Sorted Weight Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden min-h-[200px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-wider text-[#64748b] font-bold">Total Waste Sorted</span>
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
            <p className="font-display text-5xl font-extrabold tracking-tight text-slate-900 mt-4">
              {(user.totalSorted / 1000).toFixed(2)}t
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-2.5 flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-500" />
              <span>1,240 kg diverted from landfill</span>
            </p>
          </div>
          <button
            onClick={() => setScreen(ScreenType.CLASSIFIER)}
            className="mt-6 flex items-center space-x-1 text-xs font-bold text-[#6366f1] hover:text-[#5046e5] text-left cursor-pointer border-t border-slate-100 pt-3"
          >
            <span>Log disposal batch</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Streak Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden min-h-[200px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b5cf6] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-wider text-[#64748b] font-bold">Recycling Streak</span>
              <div className="bg-rose-50 p-2 rounded-xl text-rose-500">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <p className="font-display text-5xl font-extrabold tracking-tight text-slate-900 mt-4">
              {user.streak} Days
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-2.5 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1 text-rose-400" />
              <span>Streak safe for next 14 hours</span>
            </p>
          </div>
          <button
            onClick={() => setScreen(ScreenType.CLASSIFIER)}
            className="mt-6 flex items-center space-x-1 text-xs font-bold text-[#6366f1] hover:text-[#5046e5] text-left cursor-pointer border-t border-slate-100 pt-3"
          >
            <span>Extend streak today</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main content grid: Left = activities, Right = AI Recommendations / Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity List */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Telemetry History</span>
                <h3 className="font-display font-extrabold text-lg text-slate-950">Recent Activity Logs</h3>
                <p className="text-xs text-[#64748b] mt-0.5">Your physical waste sorting history verified by AI.</p>
              </div>
              <button
                onClick={() => setScreen(ScreenType.CLASSIFIER)}
                className="text-xs font-bold text-[#6366f1] hover:text-[#5046e5] cursor-pointer flex items-center space-x-0.5"
              >
                <span>View All</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {activities.length === 0 ? (
                <p className="text-sm text-slate-400 py-8 text-center font-mono">No recent activity. Use the waste classifier to begin!</p>
              ) : (
                activities.slice(0, 5).map((act) => {
                  const isEwaste = act.category === "E-Waste" || act.category === "Hazardous";
                  return (
                    <div 
                      key={act.id} 
                      className="flex justify-between items-center border border-slate-100 hover:border-slate-200 p-4 rounded-2xl hover:bg-slate-50/50 transition-all duration-150"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-wider font-mono ${
                          isEwaste 
                            ? "bg-rose-50 text-rose-700" 
                            : act.category === "Plastic" 
                            ? "bg-blue-50 text-blue-700" 
                            : act.category === "Organic" 
                            ? "bg-amber-50 text-amber-800"
                            : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {act.category === "Organic" ? "☕" : act.category === "Plastic" ? "🥤" : act.category === "E-Waste" ? "🔋" : "📄"}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">{act.itemName}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold flex items-center space-x-1.5 mt-0.5">
                            <span>{act.category}</span>
                            <span>•</span>
                            <span>{act.weight} kg</span>
                            <span>•</span>
                            <span>{act.date}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-extrabold text-[#6366f1] font-mono">+{act.points} pts</p>
                        <p className="text-[9px] text-slate-400 flex items-center justify-end font-bold mt-0.5">
                          <ShieldCheck className="h-3 w-3 text-emerald-500 mr-0.5" />
                          <span>Verified</span>
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right column: AI Recommendations & Telemetry Alerts */}
        <div className="space-y-6">
          {/* AI Optimizations Recommendations Card */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white rounded-[24px] p-6 shadow-md border border-slate-800/60 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1] rounded-full mix-blend-color-dodge filter blur-3xl opacity-15"></div>
            
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-4 w-4 text-[#8b5cf6] animate-pulse" />
                <span className="font-mono font-bold text-[10px] tracking-wider uppercase text-[#8b5cf6]">Weekly AI Insight</span>
              </div>

              <h4 className="text-sm font-extrabold leading-snug">Prioritize Organic Waste sorting this week to boost rank</h4>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Based on your local neighborhood activity patterns, plastic collection is temporarily saturated, but organic food recycling yields double bonus multipliers (+10pts per kg).
              </p>

              <div className="bg-slate-800/40 border border-slate-700/40 p-3 rounded-xl mt-4">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Suggested Action:</p>
                <p className="text-xs text-[#8b5cf6] mt-1 font-mono font-bold flex items-center">
                  <span>Classify organic kitchen scrap</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </p>
              </div>
            </div>
          </div>

          {/* Telemetry Bin Alerts Summary */}
          <div className="bg-white rounded-[24px] border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">MUNICIPAL HUB</span>
              <h3 className="font-display font-extrabold text-base text-slate-950 mb-4">Telemetry Bin Watch</h3>
              
              <div className="space-y-3">
                {activeAlertBins.slice(0, 3).map((bin) => (
                  <div 
                    key={bin.id} 
                    onClick={() => setScreen(ScreenType.ALERTS)}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-100 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <p className="font-mono text-xs font-bold text-slate-900">{bin.id}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[150px] font-medium">{bin.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded-md">
                        {bin.fillLevel}% FULL
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setScreen(ScreenType.ALERTS)}
              className="mt-5 w-full py-2.5 bg-[#1e293b] hover:bg-slate-800 text-white text-center rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1"
            >
              <span>Manage Telemetry Alerts</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
