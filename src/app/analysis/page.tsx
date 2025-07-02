import { DashboardLayout } from "@/components/DashboardLayout";
import { AnalysisPage } from "@/components/analysis/AnalysisPage";

export const metadata = {
  title: "Análisis - CryptoTracker",
  description:
    "Análisis técnico y fundamental de criptomonedas con gráficos avanzados",
};

export default function Analisis() {
  return (
    <DashboardLayout>
      <AnalysisPage />
    </DashboardLayout>
  );
}
