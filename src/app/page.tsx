import { DashboardLayout } from "@/components/DashboardLayout"
import { CryptoDashboard } from "@/components/CryptoDashboard"

export default function Home() {
  return (
    <DashboardLayout>
      <CryptoDashboard />
    </DashboardLayout>
  )
}
