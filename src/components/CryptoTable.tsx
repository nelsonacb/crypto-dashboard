"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import type { Coin, CryptoProps } from "@/interfaces";
import { useCryptoStore } from "@/store/crypto-store";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FormatCurrency, formatMarketCap } from "@/utils";

export const CryptoTable = ({ coins, loading }: CryptoProps) => {
  const { searchTerm } = useCryptoStore();
  const [sortField, setSortField] = useState<keyof Coin>("market_cap_rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const aValue = a[sortField] || 0;
    const bValue = b[sortField] || 0;

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: keyof Coin) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando datos...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mercado de Criptomonedas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Moneda</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("current_price")}
                    className="h-auto p-0 font-semibold"
                  >
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("price_change_percentage_24h")}
                    className="h-auto p-0 font-semibold"
                  >
                    24h %
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("market_cap")}
                    className="h-auto p-0 font-semibold"
                  >
                    Cap. Mercado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("total_volume")}
                    className="h-auto p-0 font-semibold"
                  >
                    Volumen 24h
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCoins.map((coin) => (
                <TableRow key={coin.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {coin.market_cap_rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={coin.image || "/placeholder.svg"}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-sm text-muted-foreground uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">
                    {FormatCurrency(coin.current_price)}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatMarketCap(coin.market_cap)}
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatMarketCap(coin.total_volume)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
