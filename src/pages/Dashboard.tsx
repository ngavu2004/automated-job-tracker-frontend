
import { useNavigate } from "react-router-dom";
import GoogleSheetsConnector from "@/components/GoogleSheetsConnector";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return <GoogleSheetsConnector onLogout={handleLogout} />;
};

export default Dashboard;
