import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, CheckCircle } from "lucide-react";
import { FormatCurrency, formatCompactCurrency } from "@/utils";
import { SummaryCardsProps } from "@/interfaces";



export const SummaryCards = ({ coinData, loading }: SummaryCardsProps) => (
  <div className="grid gap-4 md:grid-cols-3">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Precio Actual
        </CardTitle>
        {coinData && coinData.price_change_percentage_24h >= 0 ? (
          <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-600" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {coinData
            ? FormatCurrency(coinData.current_price)
            : loading ? "Cargando..." : "N/A"}
        </div>
        <p
          className={`text-xs ${
            coinData && coinData.price_change_percentage_24h >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {coinData
            ? `${
                coinData.price_change_percentage_24h >= 0 ? "+" : ""
              }${coinData.price_change_percentage_24h.toFixed(
                2
              )}% en 24h`
            : "0%"}
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Volumen 24h
        </CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {coinData
            ? formatCompactCurrency(coinData.total_volume)
            : loading ? "Cargando..." : "N/A"}
        </div>
        <p className="text-xs text-muted-foreground">
          Volumen de trading
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Cap. Mercado
        </CardTitle>
        <CheckCircle className="h-4 w-4 text-green-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {coinData
            ? formatCompactCurrency(coinData.market_cap)
            : loading ? "Cargando..." : "N/A"}
        </div>
        <p className="text-xs text-muted-foreground">
          Capitalización total
        </p>
      </CardContent>
    </Card>
  </div>
);