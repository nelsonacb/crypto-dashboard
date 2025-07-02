import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndicatorCardsProps } from "@/interfaces";
import { getStatusIcon, getStatusColor } from "@/utils";

export const IndicatorCards = ({ indicators }: IndicatorCardsProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    {indicators.map((indicator, index) => (
      <Card key={index}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {indicator.name}
          </CardTitle>
          {getStatusIcon(indicator.status)}
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${getStatusColor(
              indicator.status
            )}`}
          >
            {indicator.name.includes("RSI")
              ? indicator.value.toFixed(1)
              : indicator.name.includes("MACD")
              ? indicator.value.toFixed(2)
              : indicator.name.includes("Volumen") ||
                indicator.name.includes("Cap")
              ? `$${indicator.value.toFixed(2)}B`
              : indicator.value.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {indicator.description}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);