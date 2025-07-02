import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FormatCurrency, formatCompactCurrency } from "@/utils";
import { PriceVolumeChartProps } from "@/interfaces";


export const PriceVolumeChart = ({ coinData, priceHistory, loading }: PriceVolumeChartProps) => (
  <Card>
    <CardHeader>
      <CardTitle>
        Gráfico de Precio - {coinData?.name} (
        {coinData?.symbol.toUpperCase()})
      </CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={priceHistory}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="opacity-30"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis
                yAxisId="price"
                orientation="left"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                tickFormatter={(value) => formatCompactCurrency(value)}
              />
              <YAxis
                yAxisId="volume"
                orientation="right"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                tickFormatter={(value) =>
                  `${(value / 1000000000).toFixed(1)}B`
                }
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{label}</p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Precio:{" "}
                          </span>
                          {FormatCurrency(data.price)}
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Volumen:{" "}
                          </span>
                          {formatCompactCurrency(data.volume)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
              <Bar
                yAxisId="volume"
                dataKey="volume"
                fill="hsl(var(--muted-foreground))"
                opacity={0.3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </CardContent>
  </Card>
);