import { MarketData, CoinData, PriceHistory } from "@/interfaces";


const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
export const fetchMarketData = async (): Promise<MarketData> => {
  try {
    const response = await fetch(`${API_BASE}/global`);
    if (!response.ok) throw new Error("Error en la respuesta de la API");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};


export const fetchTopCoins = async (): Promise<CoinData[]> => {
  try {
    const response = await fetch(
      `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
    if (!response.ok) throw new Error("Error fetching top coins");
    return await response.json();
  } catch (error) {
    console.error("fetchTopCoins error:", error);
    throw error;
  }
};

export const fetchCoinData = async (coinId: string): Promise<CoinData> => {
  try {
    const response = await fetch(
      `${API_BASE}/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=1&page=1&sparkline=false`
    );
    if (!response.ok) throw new Error("Error fetching coin data");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("fetchCoinData error:", error);
    throw error;
  }
};

export const fetchPriceHistory = async (coinId: string, days: string): Promise<PriceHistory[]> => {
  try {
    const interval = days === "1" ? "hourly" : "daily";
    const response = await fetch(
      `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
    );
    if (!response.ok) throw new Error("Error fetching price history");
    const data = await response.json();

    if (data.prices && data.total_volumes) {
      return data.prices.map(
        (price: [number, number], index: number) => ({
          timestamp: price[0],
          price: price[1],
          volume: data.total_volumes[index] ? data.total_volumes[index][1] : 0,
          date: new Date(price[0]).toLocaleDateString(),
          time: new Date(price[0]).toLocaleTimeString(),
        })
      );
    }
    return [];
  } catch (error) {
    console.error("fetchPriceHistory error:", error);
    throw error;
  }
};