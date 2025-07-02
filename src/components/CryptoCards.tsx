"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { CryptoProps } from "@/interfaces";
import { useCryptoStore } from "@/store/crypto-store";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FormatCurrency, formatMarketCap } from "@/utils";

export const CryptoCards = ({ coins, loading }: CryptoProps) => {
  const { searchTerm } = useCryptoStore();

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredCoins.map((coin) => (
        <Card key={coin.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src={coin.image || "/placeholder.svg"}
                  alt={coin.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <CardTitle className="text-lg">{coin.name}</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                #{coin.market_cap_rank}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground uppercase font-mono">
              {coin.symbol}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold font-mono">
                {FormatCurrency(coin.current_price)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cambio 24h:</span>
              <Badge
                variant={
                  coin.price_change_percentage_24h >= 0
                    ? "default"
                    : "destructive"
                }
                className="font-mono"
              >
                {coin.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cap. Mercado:</span>
                <span className="font-mono">
                  {formatMarketCap(coin.market_cap)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volumen 24h:</span>
                <span className="font-mono">
                  {formatMarketCap(coin.total_volume)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
