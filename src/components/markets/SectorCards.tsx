import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sectors } from "@/data";

export const SectorCards = () => (
  <div className="grid gap-4 md:grid-cols-3">
    {sectors.map((sector) => (
      <Card key={sector.title}>
        <CardHeader>
          <CardTitle className="text-lg">{sector.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${sector.color}`}>{sector.value}</div>
          <p className="text-sm text-muted-foreground">Rendimiento 7 días</p>
        </CardContent>
      </Card>
    ))}
  </div>
);