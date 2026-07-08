import React, { useState } from "react";
import { ScreenType, User, RewardItem, RewardHistoryItem } from "../types";
import { 
  Award, Sparkles, AlertTriangle, ArrowRight, CheckCircle2, ShoppingBag, 
  Coins, History, Tag, Gift, TreeDeciduous, RefreshCw, X
} from "lucide-react";
import { INITIAL_REWARDS } from "../data";

interface RewardsScreenProps {
  user: User;
  redeemPoints: (points: number) => void;
  addHistoryItem: (item: RewardHistoryItem) => void;
  history: RewardHistoryItem[];
}

export default function RewardsScreen({ user, redeemPoints, addHistoryItem, history }: RewardsScreenProps) {
  const [rewardsList, setRewardsList] = useState<RewardItem[]>(INITIAL_REWARDS);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeDialog, setActiveDialog] = useState<RewardItem | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const filteredRewards = filterCategory === "all"
    ? rewardsList
    : rewardsList.filter(rew => rew.category === filterCategory);

  const handleOpenRedeem = (item: RewardItem) => {
    setErrorMsg("");
    setSuccessMsg("");
    setActiveDialog(item);
  };

  const handleConfirmRedeem = () => {
    if (!activeDialog) return;

    if (user.ecoPoints < activeDialog.pointsCost) {
      setErrorMsg(`Insufficient EcoPoints balance. You need ${activeDialog.pointsCost - user.ecoPoints} more points.`);
      return;
    }

    // Deduct points
    redeemPoints(activeDialog.pointsCost);

    // Add to points history
    addHistoryItem({
      id: `hist-${Date.now()}`,
      title: `Redeemed: ${activeDialog.title}`,
      points: -activeDialog.pointsCost,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      type: "redeem"
    });

    setSuccessMsg(`Redemption successful! Your unique voucher code has been emailed.`);
    
    setTimeout(() => {
      setActiveDialog(null);
      setSuccessMsg("");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8 border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-emerald-600 font-mono text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            Citizen Incentives Network
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mt-3">
            EcoSense Reward Exchange
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Redeem your accumulated EcoPoints for local organic food vouchers, municipal utility bill credits, or forestry contributions.
          </p>
        </div>

        {/* Categories Selectors */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {["all", "vouchers", "credits", "donations"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                filterCategory === cat
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards: Balance, Tier Progress, and AI Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Tier status card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-emerald-700 to-emerald-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div>
            <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400 bg-emerald-900/50 border border-emerald-800 px-2.5 py-1 rounded-sm uppercase">
              Loyalty Standing
            </span>
            <p className="font-display font-extrabold text-3xl mt-6">
              {user.tier} Tier
            </p>
            <p className="text-xs text-emerald-300 font-semibold mt-1">
              Member since June 2025 • Verified Account
            </p>
          </div>

          <div className="border-t border-emerald-800/60 pt-4 mt-8">
            <p className="text-[10px] text-emerald-300 uppercase font-mono tracking-wider">Available EcoPoints</p>
            <p className="font-display font-extrabold text-3xl text-white mt-1">
              {user.ecoPoints.toLocaleString()} <span className="text-sm font-normal text-emerald-400">pts</span>
            </p>
          </div>
        </div>

        {/* AI Point projections */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          
          <div className="flex items-center space-x-2 text-emerald-600">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="font-bold text-xs uppercase font-mono tracking-wider">Weekly AI Incentive Insight</span>
          </div>

          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            "Based on your recycling trends, you are on track to earn another <strong>450 points</strong> by next Tuesday. Keep sorting those plastics and scanning food scraps to sustain your streak bonus multiplies!"
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-50 text-slate-500 text-xs font-mono">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Total Earned</p>
              <p className="font-bold text-slate-800 text-sm mt-1">12,400 pts</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Total Redeemed</p>
              <p className="font-bold text-slate-800 text-sm mt-1">3,980 pts</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Disposal Ratio</p>
              <p className="font-bold text-slate-800 text-sm mt-1">94.8% Verified</p>
            </div>
          </div>
        </div>

      </div>

      {/* Main Row: Left = Rewards Cards Grid, Right = Points History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rewards Grid */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-display font-semibold text-lg text-slate-900 mb-4 flex items-center">
            <ShoppingBag className="h-5 w-5 text-emerald-500 mr-2" />
            Redeem your EcoPoints
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRewards.map((reward) => (
              <div 
                key={reward.id} 
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <img 
                  src={reward.image} 
                  alt={reward.title}
                  className="w-full h-36 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      {reward.category} • {reward.partnerName}
                    </span>
                    <h4 className="font-display font-semibold text-base text-slate-900 mt-1">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-1 font-mono text-sm font-extrabold text-amber-800">
                      <Coins className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span>{reward.pointsCost} pts</span>
                    </div>

                    <button
                      onClick={() => handleOpenRedeem(reward)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Redeem Reward
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points History Timeline list */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
          <h3 className="font-display font-semibold text-base text-slate-900 mb-4 flex items-center">
            <History className="h-5 w-5 text-slate-400 mr-2" />
            Stewardship History Timeline
          </h3>

          <div className="relative border-l-2 border-slate-100 pl-4 space-y-6">
            {history.map((hist) => {
              const isEarn = hist.type === "earn";
              return (
                <div key={hist.id} className="relative">
                  {/* Indicator bullet */}
                  <span className={`absolute -left-[21px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                    isEarn ? "bg-emerald-500" : "bg-rose-500"
                  }`}></span>
                  
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">{hist.date}</span>
                    <h4 className="text-xs font-bold text-slate-800 mt-0.5">{hist.title}</h4>
                    <p className={`text-xs font-extrabold font-mono mt-1 ${
                      isEarn ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {isEarn ? "+" : ""}{hist.points} pts
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Redeem Dialog Modal */}
      {activeDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 max-w-sm w-full relative">
            <button 
              onClick={() => setActiveDialog(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center">
              <div className="bg-amber-50 p-3 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center text-amber-600 border border-amber-100 mb-4">
                <Gift className="h-7 w-7" />
              </div>

              <h4 className="font-display font-bold text-lg text-slate-900">Redeem Voucher Offer?</h4>
              <p className="text-xs text-slate-500 mt-1 font-semibold">{activeDialog.title}</p>
              
              <p className="text-xs text-slate-500 mt-3 px-4">
                This transaction will securely deduct <strong>{activeDialog.pointsCost} EcoPoints</strong> from your balance.
              </p>

              {errorMsg && (
                <div className="mt-4 p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-[11px] text-rose-700 font-semibold flex items-center justify-center space-x-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-800 font-semibold flex items-center justify-center space-x-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setActiveDialog(null)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRedeem}
                  disabled={!!successMsg}
                  className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs disabled:opacity-50"
                >
                  Confirm Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
