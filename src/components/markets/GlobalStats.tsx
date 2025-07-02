import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, Globe, Zap, DollarSign } from "lucide-react";
import { FormatCurrency } from "@/utils";
import { GlobalStatsProps, StatCardProps } from "@/interfaces";


const StatCard = ({ title, value, description, change, icon, valueClassName = "" }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${valueClassName}`}>{value}</div>
      {change !== undefined ? (
        <div className="flex items-center space-x-1 text-xs">
          {change >= 0 ? (
            <TrendingUp className="h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600" />
          )}
          <span className={change >= 0 ? "text-green-600" : "text-red-600"}>
            {`${Math.abs(change).toFixed(2)}%`} 24h
          </span>
        </div>
      ) : (
        description && <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </CardContent>
  </Card>
);
export const GlobalStats = ({ marketData }: GlobalStatsProps) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <StatCard
      title="Cap. Mercado Global"
      value={FormatCurrency(marketData.total_market_cap.usd)}
      change={marketData.market_cap_change_percentage_24h_usd}
      icon={<Globe className="h-4 w-4 text-muted-foreground" />}
    />
    
    <StatCard
      title="Volumen 24h"
      value={FormatCurrency(marketData.total_volume.usd)}
      description="Volumen total de trading"
      icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
    />
    
    <StatCard
      title="Dominancia BTC"
      value={`${marketData.market_cap_percentage.btc?.toFixed(1)}%`}
      description="Del mercado total"
      icon={<DollarSign className="h-4 w-4 text-orange-500" />}
      valueClassName="text-orange-500"
    />
    
    <StatCard
      title="Dominancia ETH"
      value={`${marketData.market_cap_percentage.eth?.toFixed(1)}%`}
      description="Del mercado total"
      icon={<Zap className="h-4 w-4 text-blue-500" />}
      valueClassName="text-blue-500"
    />
  </div>
);



