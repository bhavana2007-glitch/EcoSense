import React, { useState } from "react";
import { ScreenType, User, BinStatus } from "../types";
import { 
  AlertTriangle, Filter, RefreshCw, Navigation, Truck, Sparkles, CheckCircle2,
  Trash2, Eye, ShieldAlert, Zap, Clock, MapPin, Check
} from "lucide-react";

interface AlertsScreenProps {
  user: User;
  bins: BinStatus[];
  updateBinLevel: (binId: string, level: number) => void;
}

export default function AlertsScreen({ user, bins, updateBinLevel }: AlertsScreenProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [dispatchStatus, setDispatchStatus] = useState<{ [key: string]: string }>({});
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedText, setOptimizedText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filteredBins = filterType === "all"
    ? bins
    : bins.filter(bin => bin.type.toLowerCase() === filterType.toLowerCase() || (filterType === "alerts" && bin.isAlertActive));

  // Handle Simulated Dispatch
  const handleDispatch = (binId: string) => {
    setDispatchStatus(prev => ({ ...prev, [binId]: "dispatching" }));
    
    // Simulate transit steps
    setTimeout(() => {
      setDispatchStatus(prev => ({ ...prev, [binId]: "arrived" }));
      
      setTimeout(() => {
        // Reset bin fill level back to low %
        updateBinLevel(binId, Math.floor(Math.random() * 8) + 4);
        setDispatchStatus(prev => ({ ...prev, [binId]: "cleared" }));
        
        setTimeout(() => {
          // Clear status
          setDispatchStatus(prev => {
            const copy = { ...prev };
            delete copy[binId];
            return copy;
          });
        }, 2000);
      }, 1500);
    }, 1500);
  };

  const handleRouteOptimize = () => {
    setOptimizing(true);
    setOptimizedText("");
    setTimeout(() => {
      setOptimizing(false);
      setOptimizedText("Optimal logistics route calculated! Rerouting trucks saved 4.2kg of CO2 today.");
    }, 1500);
  };

  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Slightly alter a few random levels to simulate real telemetry feeds
      bins.forEach(bin => {
        if (!bin.isAlertActive && bin.fillLevel < 90) {
          const shift = Math.floor(Math.random() * 6) - 1;
          updateBinLevel(bin.id, Math.min(100, Math.max(0, bin.fillLevel + shift)));
        }
      });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8 border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-rose-600 font-mono text-xs font-bold uppercase tracking-wider bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 flex items-center w-fit">
            <ShieldAlert className="h-3.5 w-3.5 mr-1 text-rose-500 animate-pulse" />
            Live Telemetry Feed
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mt-3">
            Overflow Telemetry Alerts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time visual monitoring of smart municipal container fill levels, enabling surgical dispatch and zero environmental leakage.
          </p>
        </div>

        {/* Filter and Refresh tools */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {["all", "alerts", "E-Waste", "Hazardous", "Plastic"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                  filterType === type
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {type === "alerts" ? "Alerts Active" : type}
              </button>
            ))}
          </div>

          <button
            onClick={handleManualRefresh}
            className="flex items-center space-x-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>Poll Telemetry</span>
          </button>
        </div>
      </div>

      {/* AI Logistics Optimization Box */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-6 mb-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="bg-emerald-950 border border-emerald-800 p-3 rounded-2xl text-emerald-400">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">AI Logistics Dispatch Optimizer</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">
                Three smart containers in sector B-4 (SoHo/Chelsea) are filling 24% faster than standard historical curves. Reroute clean-emission Collection Truck #2 to Prince St immediately?
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            <button
              onClick={handleRouteOptimize}
              disabled={optimizing}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center space-x-1 shadow-md"
            >
              {optimizing ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Computing Matrix...</span>
                </>
              ) : (
                <>
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Optimize Route Paths</span>
                </>
              )}
            </button>
            {optimizedText && (
              <p className="text-[10px] text-emerald-400 font-bold font-mono text-right animate-fade-in flex items-center">
                <Check className="h-3 w-3 mr-1" /> {optimizedText}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Telemetry Bin Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBins.map((bin) => {
          const isHigh = bin.fillLevel >= 85;
          const isMedium = bin.fillLevel >= 50 && bin.fillLevel < 85;
          const status = dispatchStatus[bin.id];

          return (
            <div 
              key={bin.id} 
              className={`bg-white border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between ${
                isHigh ? "border-rose-100 ring-1 ring-rose-50" : "border-slate-100"
              }`}
            >
              <div>
                {/* ID & Status label */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-extrabold font-mono text-slate-400">{bin.id}</span>
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                    isHigh 
                      ? "bg-rose-50 text-rose-700 border-rose-100" 
                      : isMedium
                      ? "bg-amber-50 text-amber-700 border-amber-100"
                      : "bg-emerald-50 text-emerald-700 border-emerald-100"
                  }`}>
                    {bin.type}
                  </span>
                </div>

                {/* Fill Progress Bar */}
                <div className="space-y-1.5 my-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-slate-400 font-semibold">Volume Level</span>
                    <span className={`text-sm font-extrabold font-mono ${
                      isHigh ? "text-rose-600" : isMedium ? "text-amber-600" : "text-emerald-600"
                    }`}>
                      {bin.fillLevel}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-50">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh ? "bg-rose-500" : isMedium ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${bin.fillLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-2 py-3 border-t border-b border-slate-50 text-xs font-medium text-slate-500">
                  <p className="flex items-center space-x-1.5 truncate">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{bin.location}</span>
                  </p>
                  <p className="flex items-center space-x-1.5 font-mono text-[10px]">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Telemetry polled: {bin.lastUpdated}</span>
                  </p>
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-5">
                {status === "dispatching" ? (
                  <div className="py-2.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold font-mono rounded-xl flex items-center justify-center space-x-2 animate-pulse">
                    <Truck className="h-4 w-4 animate-bounce" />
                    <span>Truck Dispatch In Route...</span>
                  </div>
                ) : status === "arrived" ? (
                  <div className="py-2.5 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold font-mono rounded-xl flex items-center justify-center space-x-2">
                    <Trash2 className="h-4 w-4 text-amber-600 animate-spin" />
                    <span>Emptying reception bay...</span>
                  </div>
                ) : status === "cleared" ? (
                  <div className="py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold font-mono rounded-xl flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Bay cleared! 0% full</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDispatch(bin.id)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
                    >
                      <Truck className="h-3.5 w-3.5" />
                      <span>Dispatch Pickup</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
