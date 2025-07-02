"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CoinProps } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatCurrency } from "@/utils";

export const CryptoChart = ({ coins }: CoinProps) => {
  if (!coins || coins.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Top 10 Criptomonedas por Capitalización de Mercado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="space-y-2 w-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = coins.slice(0, 10).map((coin) => ({
    name: coin.symbol.toUpperCase(),
    fullName: coin.name,
    price: coin.current_price,
    change: coin.price_change_percentage_24h,
    marketCap: coin.market_cap / 1000000000, // Convert to billions
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Top 10 Criptomonedas por Capitalización de Mercado
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Capitalización de mercado en miles de millones de dólares
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                tickFormatter={(value) => `$${value}B`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">
                          {data.fullName} ({label})
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Precio:{" "}
                          </span>
                          {FormatCurrency(data.price)}
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Cap. Mercado:{" "}
                          </span>
                          ${data.marketCap.toFixed(2)}B
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Cambio 24h:{" "}
                          </span>
                          <span
                            className={
                              data.change >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {data.change >= 0 ? "+" : ""}
                            {data.change.toFixed(2)}%
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="marketCap"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
