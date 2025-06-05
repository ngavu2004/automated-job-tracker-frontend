import { ProtectedRoute } from "@/context/RoutesContext"
import Dashboard from "./components/Dashboard"

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

export default DashboardPage