import { PublicRoute } from "@/context/RoutesContext";
import SignIn from "@/components/SignIn";

export default function HomePage() {
  return (
    <PublicRoute>
      <SignIn />
    </PublicRoute>
  )
}
