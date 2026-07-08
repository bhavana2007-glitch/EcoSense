import { User, LeaderboardItem, BinStatus, RewardItem, RewardHistoryItem, ActivityLog } from "./types";

export const INITIAL_USER: User = {
  id: "u-101",
  name: "John Doe",
  email: "john.doe@ecosense.org",
  ecoPoints: 8420,
  totalSorted: 1240, // 1.24 tonnes
  streak: 18,
  tier: "Emerald",
  role: "USER"
};

export const INITIAL_LEADERBOARD: LeaderboardItem[] = [
  { rank: 1, name: "Sarah Jenkins", points: 14250, totalSorted: 2150, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
  { rank: 2, name: "Michael Chen", points: 12890, totalSorted: 1840, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { rank: 3, name: "Marcus Thorne", points: 11520, totalSorted: 1620, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { rank: 4, name: "Elena Rodriguez", points: 10450, totalSorted: 1490, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80" },
  { rank: 5, name: "David Kim", points: 9810, totalSorted: 1380, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" },
  { rank: 6, name: "Aisha Patel", points: 9540, totalSorted: 1310, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { rank: 7, name: "Liam O'Connor", points: 9210, totalSorted: 1290, avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80" },
  { rank: 8, name: "Chloe Dupont", points: 9020, totalSorted: 1260, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
  { rank: 9, name: "Tomas Varga", points: 8850, totalSorted: 1250, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
  { rank: 10, name: "Sophia Martinez", points: 8600, totalSorted: 1210, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
  { rank: 11, name: "Alex Mercer", points: 8510, totalSorted: 1180, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
  { rank: 12, name: "John Doe", points: 8420, totalSorted: 1240, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80", isCurrentUser: true },
  { rank: 13, name: "Zoe Taylor", points: 8100, totalSorted: 1150, avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80" }
];

export const INITIAL_BINS: BinStatus[] = [
  {
    id: "ECO-NYC-0422",
    fillLevel: 94,
    location: "SOHO - Broadway & Prince St",
    type: "E-Waste",
    lastUpdated: "4 mins ago",
    latitude: 40.7252,
    longitude: -73.9967,
    isAlertActive: true,
    predictionDaysToFull: 0
  },
  {
    id: "ECO-NYC-0115",
    fillLevel: 88,
    location: "Midtown - 5th Ave & 42nd St",
    type: "Plastic",
    lastUpdated: "12 mins ago",
    latitude: 40.7527,
    longitude: -73.9818,
    isAlertActive: true,
    predictionDaysToFull: 0.2
  },
  {
    id: "ECO-NYC-0841",
    fillLevel: 45,
    location: "Union Square West - 15th St",
    type: "Organic",
    lastUpdated: "1 hour ago",
    latitude: 40.7359,
    longitude: -73.9911,
    isAlertActive: false,
    predictionDaysToFull: 3.5
  },
  {
    id: "ECO-NYC-0902",
    fillLevel: 91,
    location: "Chelsea - 8th Ave & 23rd St",
    type: "Hazardous",
    lastUpdated: "8 mins ago",
    latitude: 40.7445,
    longitude: -74.0001,
    isAlertActive: true,
    predictionDaysToFull: 0.1
  },
  {
    id: "ECO-NYC-0238",
    fillLevel: 22,
    location: "Central Park West - 72nd St Entrance",
    type: "Paper",
    lastUpdated: "3 hours ago",
    latitude: 40.7753,
    longitude: -73.9749,
    isAlertActive: false,
    predictionDaysToFull: 8.0
  },
  {
    id: "ECO-NYC-0714",
    fillLevel: 58,
    location: "DUMBO - Water St & Main St",
    type: "Glass",
    lastUpdated: "45 mins ago",
    latitude: 40.7033,
    longitude: -73.9896,
    isAlertActive: false,
    predictionDaysToFull: 2.1
  },
  {
    id: "ECO-NYC-1134",
    fillLevel: 72,
    location: "Williamsburg - Bedford Ave & 6th St",
    type: "Metal",
    lastUpdated: "25 mins ago",
    latitude: 40.7176,
    longitude: -73.9575,
    isAlertActive: false,
    predictionDaysToFull: 1.2
  }
];

export const INITIAL_REWARDS: RewardItem[] = [
  {
    id: "rew-1",
    title: "10% Grocery Discount",
    description: "Get 10% off your entire purchase at any Whole Foods or participating local co-ops.",
    pointsCost: 500,
    category: "vouchers",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
    partnerName: "Whole Foods Market"
  },
  {
    id: "rew-2",
    title: "Municipal Utility Bill Credit",
    description: "$15.00 direct credit towards your clean water, sewage, or waste collection municipal bill.",
    pointsCost: 1000,
    category: "credits",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80",
    partnerName: "NYC Department of Environmental Protection"
  },
  {
    id: "rew-3",
    title: "Plant a Tree Donation",
    description: "We will plant one indigenous tree in reforestation zones of upstate NY on your behalf. Includes digital certificate.",
    pointsCost: 200,
    category: "donations",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80",
    partnerName: "One Tree Planted"
  },
  {
    id: "rew-4",
    title: "$10 Coffee House Voucher",
    description: "Redeem for any artisanal beverage or bakery item at Starbucks or participating local cafes.",
    pointsCost: 350,
    category: "vouchers",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80",
    partnerName: "Starbucks"
  },
  {
    id: "rew-5",
    title: "Clean Oceans Fund Donation",
    description: "Donate $5.00 to support ocean plastic cleanup programs and automated marine bin deployments.",
    pointsCost: 250,
    category: "donations",
    image: "https://images.unsplash.com/photo-1621451537084-482c730e370a?w=500&auto=format&fit=crop&q=80",
    partnerName: "The Ocean Cleanup"
  },
  {
    id: "rew-6",
    title: "Subway Transit Pass Credit",
    description: "Add $5.00 credit value to your MTA MetroCard or OMNY account for emission-free public transit.",
    pointsCost: 400,
    category: "credits",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&auto=format&fit=crop&q=80",
    partnerName: "MTA New York City Transit"
  }
];

export const INITIAL_HISTORY: RewardHistoryItem[] = [
  { id: "hist-1", title: "Batch Recycled: Mixed Plastics", points: 150, date: "2026-06-25", status: "completed", type: "earn" },
  { id: "hist-2", title: "Weekly Challenge Bonus", points: 500, date: "2026-06-24", status: "completed", type: "earn" },
  { id: "hist-3", title: "Redeemed: Starbucks Gift Card", points: -300, date: "2026-06-22", status: "completed", type: "redeem" },
  { id: "hist-4", title: "Classified & Sorted: Lithium Battery", points: 25, date: "2026-06-20", status: "completed", type: "earn" },
  { id: "hist-5", title: "Redeemed: Plant a Tree Donation", points: -200, date: "2026-06-18", status: "completed", type: "redeem" },
  { id: "hist-6", title: "Batch Recycled: Mixed Cardboard & Glass", points: 180, date: "2026-06-15", status: "completed", type: "earn" }
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  { id: "act-1", itemName: "Lithium Ion Battery", category: "E-Waste", points: 25, weight: 0.15, date: "2 mins ago" },
  { id: "act-2", itemName: "Corrugated Cardboard", category: "Paper", points: 10, weight: 2.4, date: "2 hours ago" },
  { id: "act-3", itemName: "Polyethylene Milk Jug", category: "Plastic", points: 15, weight: 0.3, date: "1 day ago" },
  { id: "act-4", itemName: "Clear Glass Beer Bottles", category: "Glass", points: 15, weight: 1.8, date: "2 days ago" },
  { id: "act-5", itemName: "Organic Kitchen Scrap", category: "Organic", points: 5, weight: 3.5, date: "3 days ago" }
];
