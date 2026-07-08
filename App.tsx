import React, { useState } from "react";
import { ScreenType, User, BinStatus, RewardHistoryItem, ActivityLog, LeaderboardItem } from "./types";
import { 
  INITIAL_USER, INITIAL_LEADERBOARD, INITIAL_BINS, INITIAL_REWARDS, 
  INITIAL_HISTORY, INITIAL_ACTIVITIES 
} from "./data";
import Navbar from "./components/Navbar";
import LandingScreen from "./components/LandingScreen";
import AuthScreen from "./components/AuthScreen";
import DashboardScreen from "./components/DashboardScreen";
import ClassifierScreen from "./components/ClassifierScreen";
import LeaderboardScreen from "./components/LeaderboardScreen";
import RewardsScreen from "./components/RewardsScreen";
import AlertsScreen from "./components/AlertsScreen";
import AdminScreen from "./components/AdminScreen";

export default function App() {
  const [screen, setScreen] = useState<ScreenType>(ScreenType.LANDING);
  const [user, setUser] = useState<User | null>(null);
  
  // Fully reactive local simulator databases
  const [bins, setBins] = useState<BinStatus[]>(INITIAL_BINS);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);
  const [history, setHistory] = useState<RewardHistoryItem[]>(INITIAL_HISTORY);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>(INITIAL_LEADERBOARD);

  // Authentication controllers
  const loginUser = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
    setScreen(ScreenType.LANDING);
  };

  // Switch Role helper to test admin and user viewports instantly
  const toggleRole = () => {
    if (!user) return;
    const nextRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    const nextTier = nextRole === "ADMIN" ? "Platinum" : "Emerald";
    setUser(prev => prev ? {
      ...prev,
      role: nextRole,
      tier: nextTier,
      name: nextRole === "ADMIN" ? "Admin Moderator" : "John Doe"
    } : null);

    if (screen === ScreenType.ADMIN && nextRole === "USER") {
      setScreen(ScreenType.DASHBOARD);
    } else if (screen === ScreenType.DASHBOARD && nextRole === "ADMIN") {
      setScreen(ScreenType.ADMIN);
    }
  };

  // Points and Weight updater
  const updateUserPoints = (points: number, weight: number) => {
    if (!user) return;
    
    // Add to user scores
    setUser(prev => prev ? {
      ...prev,
      ecoPoints: prev.ecoPoints + points,
      totalSorted: prev.totalSorted + (weight * 1000) // Convert kg to g or store directly
    } : null);

    // Also update leaderboard standing for John Doe
    setLeaderboard(prev => prev.map(item => {
      if (item.isCurrentUser || item.name === user.name) {
        return {
          ...item,
          points: item.points + points,
          totalSorted: item.totalSorted + (weight * 1000)
        };
      }
      return item;
    }).sort((a, b) => b.points - a.points).map((item, idx) => ({ ...item, rank: idx + 1 })));
  };

  const redeemPoints = (points: number) => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      ecoPoints: prev.ecoPoints - points
    } : null);

    // Sync with leaderboard standing
    setLeaderboard(prev => prev.map(item => {
      if (item.isCurrentUser || item.name === user.name) {
        return {
          ...item,
          points: item.points - points
        };
      }
      return item;
    }).sort((a, b) => b.points - a.points).map((item, idx) => ({ ...item, rank: idx + 1 })));
  };

  // Activity logger
  const addActivity = (act: ActivityLog) => {
    setActivities(prev => [act, ...prev]);
  };

  // Reward history timeline logger
  const addHistoryItem = (item: RewardHistoryItem) => {
    setHistory(prev => [item, ...prev]);
  };

  // Telemetry bin update feed
  const updateBinLevel = (binId: string, level: number) => {
    setBins(prev => prev.map(bin => {
      if (bin.id === binId) {
        return {
          ...bin,
          fillLevel: level,
          isAlertActive: level >= 85,
          lastUpdated: "Just now"
        };
      }
      return bin;
    }));
  };

  // Direct screens rendering router
  const renderScreen = () => {
    switch (screen) {
      case ScreenType.LANDING:
        return <LandingScreen setScreen={setScreen} />;
      
      case ScreenType.AUTH:
        return <AuthScreen loginUser={loginUser} setScreen={setScreen} />;
      
      case ScreenType.DASHBOARD:
        if (!user) { setScreen(ScreenType.AUTH); return null; }
        return (
          <DashboardScreen 
            user={user} 
            setScreen={setScreen} 
            activities={activities}
            bins={bins}
          />
        );
      
      case ScreenType.CLASSIFIER:
        if (!user) { setScreen(ScreenType.AUTH); return null; }
        return (
          <ClassifierScreen 
            user={user} 
            addActivity={addActivity} 
            updateUserPoints={updateUserPoints} 
          />
        );
      
      case ScreenType.LEADERBOARD:
        if (!user) { setScreen(ScreenType.AUTH); return null; }
        return (
          <LeaderboardScreen 
            user={user} 
            setScreen={setScreen} 
            leaderboard={leaderboard} 
          />
        );
      
      case ScreenType.REWARDS:
        if (!user) { setScreen(ScreenType.AUTH); return null; }
        return (
          <RewardsScreen 
            user={user} 
            redeemPoints={redeemPoints} 
            addHistoryItem={addHistoryItem} 
            history={history} 
          />
        );
      
      case ScreenType.ALERTS:
        if (!user) { setScreen(ScreenType.AUTH); return null; }
        return (
          <AlertsScreen 
            user={user} 
            bins={bins} 
            updateBinLevel={updateBinLevel} 
          />
        );
      
      case ScreenType.ADMIN:
        if (!user || user.role !== "ADMIN") { setScreen(ScreenType.AUTH); return null; }
        return (
          <AdminScreen 
            user={user} 
            bins={bins} 
            setScreen={setScreen} 
          />
        );

      default:
        return <LandingScreen setScreen={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9] text-slate-800">
      <Navbar 
        currentScreen={screen} 
        setScreen={setScreen} 
        user={user} 
        logout={logout}
        toggleRole={toggleRole}
      />
      
      <main className="flex-grow">
        {renderScreen()}
      </main>
    </div>
  );
}
