import { DashboardLayout } from "@/components/dashboard-layout"
import { CryptoDashboard } from "@/components/crypto-dashboard"

export default function Home() {
  return (
    <DashboardLayout>
      <CryptoDashboard />
    </DashboardLayout>
  )
}
