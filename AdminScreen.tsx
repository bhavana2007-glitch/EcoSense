import React, { useState } from "react";
import { ScreenType, User, BinStatus } from "../types";
import { 
  Users, BarChart3, Coins, Sparkles, AlertTriangle, ShieldCheck, RefreshCw, 
  Settings, FolderKanban, Terminal, MapPin, Database, ChevronRight, Activity
} from "lucide-react";

interface AdminScreenProps {
  user: User;
  bins: BinStatus[];
  setScreen: (screen: ScreenType) => void;
}

export default function AdminScreen({ user, bins, setScreen }: AdminScreenProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Custom Category Data for Donut Chart
  const categoriesData = [
    { name: "Organic", percentage: 45, color: "#f59e0b", value: "38.0t" },
    { name: "Plastic", percentage: 25, color: "#3b82f6", value: "21.1t" },
    { name: "Paper", percentage: 15, color: "#10b981", value: "12.6t" },
    { name: "Glass", percentage: 15, color: "#8b5cf6", value: "12.6t" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Outer border container */}
      <div className="lg:grid lg:grid-cols-12 gap-8 border border-slate-100 rounded-2xl bg-white shadow-xs overflow-hidden">
        
        {/* Left sidebar nav */}
        <div className="lg:col-span-3 border-r border-slate-100 bg-slate-50/50 p-4 space-y-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="px-3 py-2 border-b border-slate-100 mb-4">
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Supervisor Hub</span>
              <p className="text-sm font-bold text-slate-900 mt-1">EcoSense Admin Console</p>
            </div>

            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "analytics", label: "Analytics", icon: Database },
              { id: "bins", label: "Bin Status", icon: MapPin },
              { id: "users", label: "User Management", icon: Users },
              { id: "logs", label: "System Logs", icon: Terminal },
              { id: "settings", label: "Settings", icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 text-[10px] font-mono mt-8">
            <p className="text-emerald-400 font-bold flex items-center">
              <Activity className="h-3 w-3 mr-1 text-emerald-400 animate-pulse" />
              SYSTEM SECURE
            </p>
            <p className="text-slate-400 mt-1">Node version: v20.10.0</p>
            <p className="text-slate-400">DB connection: Stable</p>
          </div>
        </div>

        {/* Right content view */}
        <div className="lg:col-span-9 p-6 sm:p-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-50 pb-5 gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl text-slate-900">Admin Overview Summary</h2>
              <p className="text-xs text-slate-500 mt-1">Stewardship metrics logged for Sector B-4 (SoHo/Chelsea district).</p>
            </div>
            
            {/* Range indicator */}
            <div className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-600 text-xs font-semibold font-mono">
              June 2026 (Live Feed)
            </div>
          </div>

          {/* Bento Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Total Users */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex justify-between items-start">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Total Users Registered</p>
                <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">12,842</p>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-100 mt-2 inline-block">
                  +14.2% MoM
                </span>
              </div>
              <div className="bg-sky-50 text-sky-600 p-2.5 rounded-xl border border-sky-100">
                <Users className="h-5 w-5" />
              </div>
            </div>

            {/* Total Disposals */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex justify-between items-start">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Total Disposals Sorted</p>
                <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">84.5k</p>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-100 mt-2 inline-block">
                  +8.1% MoM
                </span>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>

            {/* EcoPoints Distributed */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex justify-between items-start">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Eco Points Issued</p>
                <p className="font-display font-extrabold text-3xl text-slate-900 mt-2">2.4M</p>
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded-sm border border-rose-100 mt-2 inline-block">
                  -2.4% MoM
                </span>
              </div>
              <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl border border-amber-100">
                <Coins className="h-5 w-5 fill-amber-500" />
              </div>
            </div>

          </div>

          {/* Grid: Left = custom SVG Donut, Right = AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Custom SVG Donut Chart */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
              <h3 className="font-display font-semibold text-base text-slate-900 mb-1">Waste Category Breakdown</h3>
              <p className="text-xs text-slate-400 mb-6">Percentage breakdown of material volume collected.</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                {/* SVG Circle */}
                <div className="relative h-40 w-40 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Circle slices computed mathematically */}
                    {/* Organic: 45% (dasharray 45 55) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="transparent" 
                      stroke="#f59e0b" 
                      strokeWidth="10" 
                      strokeDasharray="45 55" 
                      strokeDashoffset="0"
                    />
                    {/* Plastic: 25% (dasharray 25 75, offset 45) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="transparent" 
                      stroke="#3b82f6" 
                      strokeWidth="10" 
                      strokeDasharray="25 75" 
                      strokeDashoffset="-45"
                    />
                    {/* Paper: 15% (dasharray 15 85, offset 70) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="transparent" 
                      stroke="#10b981" 
                      strokeWidth="10" 
                      strokeDasharray="15 85" 
                      strokeDashoffset="-70"
                    />
                    {/* Glass: 15% (dasharray 15 85, offset 85) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="transparent" 
                      stroke="#8b5cf6" 
                      strokeWidth="10" 
                      strokeDasharray="15 85" 
                      strokeDashoffset="-85"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Average Rate</span>
                    <span className="font-display font-extrabold text-lg text-slate-900">84.3t</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-3 font-semibold text-xs">
                  {categoriesData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <div className="w-24">
                        <p className="text-slate-800 font-bold">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{item.value}</p>
                      </div>
                      <span className="text-slate-500 font-mono text-xs">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EcoSense AI Insights */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
              
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 mb-4">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span className="font-semibold text-xs uppercase font-mono tracking-wider">EcoSense AI Insights</span>
                </div>

                <div className="space-y-4">
                  {/* Insight 1 */}
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <p className="text-xs font-bold text-white">Optimal Route Routing</p>
                    <p className="text-[10px] text-slate-300 mt-0.5">Automated dispatch rescheduled Prince St containers, saving 18% fuel emissions.</p>
                  </div>

                  {/* Insight 2 */}
                  <div className="border-l-2 border-rose-500 pl-3">
                    <p className="text-xs font-bold text-white">Anomaly Detected</p>
                    <p className="text-[10px] text-slate-300 mt-0.5">Electronic lithium battery disposals spiked by 42% in SOHO Prince St sector.</p>
                  </div>

                  {/* Insight 3 */}
                  <div className="border-l-2 border-sky-500 pl-3">
                    <p className="text-xs font-bold text-white">Impact Forecast</p>
                    <p className="text-[10px] text-slate-300 mt-0.5">Municipal landfill diversion is pacing to hit the target 92% rate by July 4.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen(ScreenType.ALERTS)}
                className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 text-left cursor-pointer"
              >
                <span>View Logistics telemetry</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Bins Overview list */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-semibold text-base text-slate-900">Bin Status Overviews</h3>
              <button
                onClick={() => setScreen(ScreenType.ALERTS)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center"
              >
                <span>Full Telemetry View</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="py-2.5">Bin ID</th>
                    <th className="py-2.5">Location</th>
                    <th className="py-2.5">Type</th>
                    <th className="py-2.5">Fill status</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bins.slice(0, 4).map((bin) => {
                    const isFull = bin.fillLevel >= 85;
                    return (
                      <tr key={bin.id} className="hover:bg-slate-50/50">
                        <td className="py-3 font-mono font-bold text-slate-800">{bin.id}</td>
                        <td className="py-3 text-slate-600">{bin.location}</td>
                        <td className="py-3 text-slate-500 font-mono text-[10px]">{bin.type}</td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${isFull ? "bg-rose-500" : "bg-emerald-500"}`}
                                style={{ width: `${bin.fillLevel}%` }}
                              ></div>
                            </div>
                            <span className="font-mono text-[10px]">{bin.fillLevel}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                            isFull 
                              ? "bg-rose-50 text-rose-700 border-rose-100" 
                              : "bg-emerald-50 text-emerald-700 border-emerald-100"
                          }`}>
                            {isFull ? "ALERT" : "OK"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
