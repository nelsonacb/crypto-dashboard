import { CoinData } from "@/interfaces";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export const formatCurrency = (value: number, client: boolean) => {
  if (!client) {
    return "0,00 US$";
  }
  if (value === 0) {
    return "0 US$";
  }
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

export const FormatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
    notation: "compact",
  }).format(value);
};

export const formatMarketCap = (value: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "bullish":
      return "text-green-600";
    case "bearish":
      return "text-red-600";
    default:
      return "text-yellow-600";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "bullish":
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case "bearish":
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    default:
      return <Activity className="h-4 w-4 text-yellow-600" />;
  }
};

export const formatCompactCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

export const calculateIndicators = (coinData: CoinData | null) => {
  return [
    {
      name: "RSI (14)",
      value: coinData
        ? Math.min(
            Math.max(50 + (coinData.price_change_percentage_24h || 0) * 2, 0),
            100
          )
        : 50,
      status:
        coinData && coinData.price_change_percentage_24h > 5
          ? "bullish"
          : coinData && coinData.price_change_percentage_24h < -5
          ? "bearish"
          : "neutral",
      description: "Índice de Fuerza Relativa",
    },
    {
      name: "MACD",
      value: coinData ? coinData.price_change_percentage_24h * 100 : 0,
      status:
        coinData && coinData.price_change_percentage_24h > 0
          ? "bullish"
          : "bearish",
      description: "Convergencia/Divergencia de Medias Móviles",
    },
    {
      name: "Volumen",
      value: coinData ? coinData.total_volume / 1000000000 : 0,
      status: "neutral",
      description: "Volumen de trading en 24h (B)",
    },
    {
      name: "Cap. Mercado",
      value: coinData ? coinData.market_cap / 1000000000 : 0,
      status: "neutral",
      description: "Capitalización de mercado (B)",
    },
  ];
};