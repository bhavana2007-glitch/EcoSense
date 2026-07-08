import React, { useState } from "react";
import { ScreenType, User, LeaderboardItem } from "../types";
import { 
  Award, Search, Sparkles, TrendingUp, HelpCircle, ArrowUpRight, 
  ChevronRight, ArrowRight, ShieldCheck, Star, Users, Flame
} from "lucide-react";

interface LeaderboardScreenProps {
  user: User;
  setScreen: (screen: ScreenType) => void;
  leaderboard: LeaderboardItem[];
}

export default function LeaderboardScreen({ user, setScreen, leaderboard }: LeaderboardScreenProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Find user's actual placement in the full list
  const currentUserIndex = leaderboard.findIndex(item => item.isCurrentUser || item.name === user.name);
  const currentUserRank = currentUserIndex !== -1 ? leaderboard[currentUserIndex].rank : 12;
  const currentUserPoints = user.ecoPoints;

  // Filter leaderboard
  const filteredLeaderboard = leaderboard.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8 border-b border-gray-100 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-emerald-600 font-mono text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            Decentralized Rep Networks
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mt-3">
            Global Stewardship Leaderboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time standings of citizens and municipal networks diverting materials into regenerative loops.
          </p>
        </div>

        {/* Search Field */}
        <div className="relative max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contributors..."
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Standings Grid Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left Side: Standing Card & AI Boost Suggestion */}
        <div className="lg:col-span-5 space-y-6">
          {/* Standing Card */}
          <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            
            <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400 bg-emerald-900/50 border border-emerald-800 px-2 py-1 rounded-sm uppercase">
              Your Current Standing
            </span>

            <div className="flex items-center space-x-4 mt-6">
              <img 
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80"
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-display font-bold text-xl">{user.name}</h3>
                <p className="text-xs text-emerald-300 font-semibold mt-0.5">Stewardship Rank: <strong>#{currentUserRank}</strong></p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 border-t border-emerald-800/60 mt-6 pt-4">
              <div>
                <p className="text-[10px] text-emerald-300 uppercase font-mono tracking-wider">EcoPoints Balance</p>
                <p className="text-lg font-extrabold font-mono text-white mt-1">{currentUserPoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-300 uppercase font-mono tracking-wider">Waste Sorted</p>
                <p className="text-lg font-extrabold font-mono text-white mt-1">{(user.totalSorted).toLocaleString()} kg</p>
              </div>
            </div>

            {/* Progress metric */}
            <div className="mt-6 pt-4 border-t border-emerald-800/40">
              <div className="flex justify-between text-xs font-semibold text-emerald-300 mb-2">
                <span>Progress to Top 10</span>
                <span>82%</span>
              </div>
              <div className="w-full bg-emerald-950/80 rounded-full h-2 overflow-hidden border border-emerald-900">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>
          </div>

          {/* AI Optimizations Advice */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
            
            <div className="flex items-center space-x-2 text-amber-600 mb-3">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="font-semibold text-xs uppercase font-mono tracking-wider">AI Optimization Tip</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Based on your activity history, prioritizing <strong>Organic Waste</strong> sorting this week could boost your standing by <strong>3 positions</strong>. Organic kitchen scrap multiplier yields an extra 50% points.
            </p>

            <button
              onClick={() => setScreen(ScreenType.CLASSIFIER)}
              className="mt-4 flex items-center space-x-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              <span>Launch smart classifier</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Global Aggregates Bento Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Global Avg.</p>
              <p className="font-display font-bold text-2xl text-slate-800 mt-1">4,120</p>
              <p className="text-[10px] text-slate-500 font-medium">Points per member</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Total Sorted</p>
              <p className="font-display font-bold text-2xl text-slate-800 mt-1">12.4t</p>
              <p className="text-[10px] text-slate-500 font-medium">Decentralized tons</p>
            </div>
          </div>
        </div>

        {/* Right Side: Leaderboard Table of Top Contributors */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="font-display font-semibold text-lg text-slate-900">Top Global Contributors</h3>
            <p className="text-xs text-slate-500">Stewardship scores updated in real time via local bin telemetry logs.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="py-3 px-2">Rank</th>
                  <th className="py-3 px-2">Contributor</th>
                  <th className="py-3 px-2">EcoPoints</th>
                  <th className="py-3 px-2 text-right">Diverted Waste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLeaderboard.map((item) => {
                  const isUser = item.isCurrentUser || item.name === user.name;
                  return (
                    <tr 
                      key={item.rank}
                      className={`transition-colors ${
                        isUser 
                          ? "bg-emerald-50/70 text-emerald-950 font-semibold" 
                          : "hover:bg-slate-50/50"
                      }`}
                    >
                      <td className="py-3.5 px-2">
                        <div className="flex items-center space-x-1.5">
                          {item.rank <= 3 ? (
                            <span className={`flex items-center justify-center font-bold h-6 w-6 rounded-full text-[10px] ${
                              item.rank === 1 
                                ? "bg-amber-100 text-amber-700" 
                                : item.rank === 2 
                                ? "bg-slate-200 text-slate-700"
                                : "bg-amber-50 text-amber-800"
                            }`}>
                              <Star className="h-3 w-3 fill-current" />
                            </span>
                          ) : (
                            <span className="font-mono text-slate-400 pl-2">#{item.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-2">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.avatar} 
                            alt={item.name} 
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold">{item.name}</p>
                            {isUser && <span className="text-[10px] text-emerald-600 font-semibold font-mono uppercase">You</span>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-2 font-mono font-bold">
                        {isUser ? currentUserPoints.toLocaleString() : item.points.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-500">
                        {isUser ? (user.totalSorted).toLocaleString() : item.totalSorted.toLocaleString()} kg
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
  );
}
