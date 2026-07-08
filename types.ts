/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ScreenType {
  LANDING = "LANDING",
  AUTH = "AUTH",
  DASHBOARD = "DASHBOARD",
  CLASSIFIER = "CLASSIFIER",
  LEADERBOARD = "LEADERBOARD",
  REWARDS = "REWARDS",
  ALERTS = "ALERTS",
  ADMIN = "ADMIN"
}

export interface User {
  id: string;
  name: string;
  email: string;
  ecoPoints: number;
  totalSorted: number; // in kg
  streak: number; // in days
  tier: "Bronze" | "Silver" | "Gold" | "Emerald" | "Platinum";
  role: "USER" | "ADMIN";
}

export interface WasteClassificationResult {
  itemName: string;
  category: "Organic" | "Plastic" | "Paper" | "Glass" | "Metal" | "E-Waste" | "Hazardous" | "Other";
  hazardStatus: "SAFE" | "WARNING" | "HAZARDOUS";
  confidence: number;
  points: number;
  disposalSteps: string[];
  sustainableAlternatives: string[];
  specialInstructions: string;
}

export interface LeaderboardItem {
  rank: number;
  name: string;
  points: number;
  totalSorted: number; // kg
  avatar: string;
  isCurrentUser?: boolean;
}

export interface BinStatus {
  id: string;
  fillLevel: number; // percentage (0-100)
  location: string;
  type: "Organic" | "Plastic" | "Paper" | "Glass" | "Metal" | "E-Waste" | "Hazardous";
  lastUpdated: string;
  latitude: number;
  longitude: number;
  isAlertActive: boolean;
  predictionDaysToFull: number;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: "vouchers" | "credits" | "donations";
  image: string;
  partnerName: string;
}

export interface RewardHistoryItem {
  id: string;
  title: string;
  points: number;
  date: string;
  status: "completed" | "pending";
  type: "earn" | "redeem";
}

export interface ActivityLog {
  id: string;
  itemName: string;
  category: string;
  points: number;
  weight: number; // kg
  date: string;
}
