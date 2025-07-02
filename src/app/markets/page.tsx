import { DashboardLayout } from "@/components/dashboard-layout";
import { MarketsPage } from "@/components/markets/MarketsPage";

export const metadata = {
  title: "Mercados - CryptoTracker",
  description:
    "Análisis completo de mercados de criptomonedas, tendencias y volúmenes de trading",
};

export default function Mercados() {
  return (
    <DashboardLayout>
      <MarketsPage />
    </DashboardLayout>
  );
}
