"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoinData, PriceHistory } from "@/interfaces";
import { fetchTopCoins, fetchCoinData, fetchPriceHistory } from "@/services";
import { CoinSelector } from "@/components/analysis/CoinSelector";
import { SummaryCards } from "@/components/analysis/SummaryCards";
import { PriceVolumeChart } from "@/components/analysis/PriceVolumeChart";
import { IndicatorCards } from "@/components/analysis/IndicatorCards";
import { AnalysisSummary } from "@/components/analysis/AnalysisSummary";
import { ComparisonChart } from "@/components/analysis/ComparisonChart";
import { calculateIndicators } from "@/utils";

export const AnalysisPage = () => {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeframe, setTimeframe] = useState("7");
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [topCoins, setTopCoins] = useState<CoinData[]>([]);

  // Fetch top coins for selection
  useEffect(() => {
    const loadTopCoins = async () => {
      try {
        const coins = await fetchTopCoins();
        setTopCoins(coins);
      } catch (error) {
        console.error("Error loading top coins:", error);
      }
    };
    loadTopCoins();
  }, []);

  // Fetch coin data and price history
  useEffect(() => {
    const loadCoinData = async () => {
      setLoading(true);
      try {
        const [coin, history] = await Promise.all([
          fetchCoinData(selectedCoin),
          fetchPriceHistory(selectedCoin, timeframe)
        ]);
        setCoinData(coin);
        setPriceHistory(history);
      } catch (error) {
        console.error("Error loading coin data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCoin) {
      loadCoinData();
    }
  }, [selectedCoin, timeframe]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const coin = await fetchCoinData(selectedCoin);
      setCoinData(coin);
    } catch (error) {
      console.error("Error refreshing coin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const indicators = calculateIndicators(coinData);

  return (
    <div className="space-y-6 md:ml-64">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Análisis Técnico</h1>
          <p className="text-muted-foreground">
            Análisis avanzado y señales de trading
          </p>
        </div>
        <CoinSelector 
          selectedCoin={selectedCoin}
          onCoinChange={setSelectedCoin}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          onRefresh={refreshData}
          loading={loading}
          topCoins={topCoins}
        />
      </div>

      <Tabs defaultValue="precio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="precio">Análisis de Precio</TabsTrigger>
          <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
          <TabsTrigger value="comparacion">Comparación</TabsTrigger>
        </TabsList>

        <TabsContent value="precio" className="space-y-4">
          <SummaryCards coinData={coinData} loading={loading} />
          <PriceVolumeChart 
            coinData={coinData} 
            priceHistory={priceHistory} 
            loading={loading} 
          />
        </TabsContent>

        <TabsContent value="indicadores" className="space-y-4">
          <IndicatorCards indicators={indicators} />
          <AnalysisSummary coinData={coinData} />
        </TabsContent>

        <TabsContent value="comparacion" className="space-y-4">
          <ComparisonChart topCoins={topCoins} />
        </TabsContent>
      </Tabs>
    </div>
  );
};