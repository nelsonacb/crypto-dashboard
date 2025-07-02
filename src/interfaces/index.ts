export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

export interface CoinProps {
  coins: Coin[];
}

export interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface CryptoProps extends CoinProps {
  loading: boolean;
}

export interface MarketData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
}

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

export interface PriceHistory {
  timestamp: number;
  price: number;
  volume: number;
}

export interface DominanceData {
  name: string;
  value: number;
  color: string;
}

export interface DominanceChartProps {
  data: DominanceData[];
}

export interface GlobalStatsProps {
  marketData: MarketData;
}

export interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  change?: number;
  icon: React.ReactNode;
  valueClassName?: string;
}

export interface CoinSelectorProps {
  selectedCoin: string;
  onCoinChange: (value: string) => void;
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  onRefresh: () => void;
  loading: boolean;
  topCoins: CoinData[];
}

export interface SummaryCardsProps {
  coinData: CoinData | null;
  loading: boolean;
}

export interface PriceVolumeChartProps {
  coinData: CoinData | null;
  priceHistory: PriceHistory[];
  loading: boolean;
}

export interface Indicator {
  name: string;
  value: number;
  status: string;
  description: string;
}

export interface IndicatorCardsProps {
  indicators: Indicator[];
}

export interface AnalysisSummaryProps {
  coinData: CoinData | null;
}

export interface ComparisonChartProps {
  topCoins: CoinData[];
}