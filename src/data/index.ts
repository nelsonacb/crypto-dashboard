import { BarChart3, TrendingUp, Home } from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Mercados", href: "/markets", icon: TrendingUp },
  { name: "Análisis", href: "/analysis", icon: BarChart3 },
];

export const trendData = [
  { name: "Ene", value: 1200 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 1600 },
  { name: "Abr", value: 2200 },
  { name: "May", value: 2800 },
  { name: "Jun", value: 2400 },
];

export const sectors = [
  { title: "DeFi", value: "+12.5%", color: "text-green-600" },
  { title: "NFTs", value: "-8.2%", color: "text-red-600" },
  { title: "Gaming", value: "+5.7%", color: "text-green-600" },
];