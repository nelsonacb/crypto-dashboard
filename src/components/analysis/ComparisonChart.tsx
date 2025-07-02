import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ComparisonChartProps } from "@/interfaces";

export const ComparisonChart = ({ topCoins }: ComparisonChartProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Comparación con Top Criptomonedas</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={topCoins.slice(0, 5)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="symbol" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(2)}%`, "Cambio 24h"]}
              labelFormatter={(label) => `${label.toUpperCase()}`}
            />
            <Line
              type="monotone"
              dataKey="price_change_percentage_24h"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                r: 4,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);