import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CoinSelectorProps } from "@/interfaces";

export const CoinSelector = ({
  selectedCoin,
  onCoinChange,
  timeframe,
  onTimeframeChange,
  onRefresh,
  loading,
  topCoins,
}: CoinSelectorProps) => (
  <div className="flex space-x-2">
    <Select value={selectedCoin} onValueChange={onCoinChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {topCoins.map((coin) => (
          <SelectItem key={coin.id} value={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Select value={timeframe} onValueChange={onTimeframeChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 Día</SelectItem>
        <SelectItem value="7">7 Días</SelectItem>
        <SelectItem value="30">30 Días</SelectItem>
        <SelectItem value="90">90 Días</SelectItem>
      </SelectContent>
    </Select>

    <Button onClick={onRefresh} disabled={loading} size="icon">
      <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
    </Button>
  </div>
);