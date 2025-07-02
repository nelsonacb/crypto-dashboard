"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketData } from "@/interfaces";
import { fetchMarketData } from "@/services";
import { GlobalStats } from "@/components/markets/GlobalStats";
import { DominanceChart } from "@/components/markets/DominanceChart";
import { MarketTrendChart } from "@/components/markets/MarketTrendChart";
import { SectorCards } from "@/components/markets/SectorCards";
import { LoadingSkeleton } from "@/components/Loader";

export const MarketsPage = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMarketData();
        setMarketData(data);
      } catch (error) {
        console.error("Error loading market data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const dominanceData = marketData
    ? Object.entries(marketData.market_cap_percentage)
        .slice(0, 5)
        .map(([key, value]) => ({
          name: key.toUpperCase(),
          value: value,
          color:
            key === "btc"
              ? "#f7931a"
              : key === "eth"
              ? "#627eea"
              : `hsl(${Math.random() * 360}, 70%, 50%)`,
        }))
    : [];

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6 md:ml-64">
      <div>
        <h1 className="text-3xl font-bold">Mercados Globales</h1>
        <p className="text-muted-foreground">
          Análisis completo del mercado de criptomonedas
        </p>
      </div>

      {marketData && <GlobalStats marketData={marketData} />}

      <Tabs defaultValue="dominancia" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dominancia">Dominancia</TabsTrigger>
          <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
          <TabsTrigger value="sectores">Sectores</TabsTrigger>
        </TabsList>

        <TabsContent value="dominancia" className="space-y-4">
          <DominanceChart data={dominanceData} />
        </TabsContent>

        <TabsContent value="tendencias" className="space-y-4">
          <MarketTrendChart />
        </TabsContent>

        <TabsContent value="sectores" className="space-y-4">
          <SectorCards />
        </TabsContent>
      </Tabs>
    </div>
  );
}