"use client";

import { useEffect } from "react";
import { useCryptoStore } from "@/store/crypto-store";
import { CryptoTable } from "@/components/crypto-table";
import { CryptoCards } from "@/components/crypto-cards";
import { CryptoChart } from "@/components/crypto-chart";
import { StatsCards } from "@/components/StatsCards";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CryptoDashboard = () => {
  const {
    coins,
    loading,
    error,
    viewMode,
    currentPage,
    fetchCoins,
    refreshData,
  } = useCryptoStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleRefresh = async () => {
    await refreshData();
    toast({
      title: "Datos actualizados",
      description: "La información de criptomonedas ha sido actualizada.",
    });
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-destructive">Error al cargar los datos: {error}</p>
        <Button onClick={() => fetchCoins()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:ml-64">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Criptomonedas</h1>
          <p className="text-muted-foreground">
            Monitorea las principales criptomonedas en tiempo real
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Actualizar
        </Button>
      </div>

      <StatsCards coins={coins} />

      <CryptoChart coins={coins.slice(0, 10)} />

      <div className="space-y-4">
        {viewMode === "table" ? (
          <CryptoTable coins={coins} loading={loading} />
        ) : (
          <CryptoCards coins={coins} loading={loading} />
        )}

        <Pagination />
      </div>
    </div>
  );
};
