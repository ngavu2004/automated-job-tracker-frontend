import { PublicRoute } from "@/context/RoutesContext"
import UpcomingFeatures from "./components/UpCommingFeatures"

const UpcommingPage = () => {
  return (
    <PublicRoute>
      <UpcomingFeatures />
    </PublicRoute>
  )
}

export default UpcommingPage