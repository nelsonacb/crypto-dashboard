import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisSummaryProps } from "@/interfaces";

export const AnalysisSummary = ({ coinData }: AnalysisSummaryProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Resumen de Análisis</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Tendencia General:</span>
            <Badge
              variant={
                coinData && coinData.price_change_percentage_24h > 2
                  ? "default"
                  : coinData &&
                    coinData.price_change_percentage_24h < -2
                  ? "destructive"
                  : "secondary"
              }
            >
              {coinData && coinData.price_change_percentage_24h > 2
                ? "ALCISTA"
                : coinData && coinData.price_change_percentage_24h < -2
                ? "BAJISTA"
                : "NEUTRAL"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Basado en el análisis de precio y volumen de las últimas 24
            horas
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);