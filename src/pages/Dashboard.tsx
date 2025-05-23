
import { useAuth } from "@/context/AuthContext";
import GoogleSheetsConnector from "@/components/GoogleSheetsConnector";

const Dashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  return <GoogleSheetsConnector onLogout={handleLogout} />;
};

export default Dashboard;
