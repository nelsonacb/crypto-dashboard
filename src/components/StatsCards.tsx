"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import type { CoinProps } from "@/interfaces";
import { formatCurrency } from "@/utils";

export const StatsCards = ({ coins }: CoinProps) => {
  const [isClient, setIsClient] = useState(false);
  const totalMarketCap = coins.reduce(
    (sum, coin) => sum + (coin.market_cap || 0),
    0
  );
  const gainers = coins.filter(
    (coin) => (coin.price_change_percentage_24h || 0) > 0
  ).length;
  const losers = coins.filter(
    (coin) => (coin.price_change_percentage_24h || 0) < 0
  ).length;
  const avgChange =
    coins.reduce(
      (sum, coin) => sum + (coin.price_change_percentage_24h || 0),
      0
    ) / coins.length;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cap. de Mercado</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalMarketCap, isClient)}
          </div>
          <p className="text-xs text-muted-foreground">Total de las top 100</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ganadores</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{gainers}</div>
          <p className="text-xs text-muted-foreground">Monedas en verde 24h</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Perdedores</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{losers}</div>
          <p className="text-xs text-muted-foreground">Monedas en rojo 24h</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cambio Promedio</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              avgChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {avgChange >= 0 ? "+" : ""}
            {avgChange.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">Cambio promedio 24h</p>
        </CardContent>
      </Card>
    </div>
  );
};
