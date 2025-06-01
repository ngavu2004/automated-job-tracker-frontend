
import { useAuth } from "@/context/AuthContext";
import GoogleSheetsConnector from "@/components/GoogleSheetsConnector";
import EmailFetcher from "@/components/EmailFetcher";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Dashboard = () => {
  const { logout } = useAuth();
  const onLogout = () => {handleLogout()};
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    navigate("/");
  };

  const fetchProfile = useCallback(async () => {
    try {
      console.log("Fetching user profile from:", import.meta.env.VITE_USER_PROFILE_URL);
      const response = await fetch(import.meta.env.VITE_USER_PROFILE_URL, { credentials: "include" });
      const data = await response.json();
      console.log("User profile data:", data);
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      navigate("/"); // Redirect to login if user's not logging in
      setUserProfile(null);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your job application tracking</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/upcoming-features")}
              variant="outline"
              className="hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-colors"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Upcoming Features
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <EmailFetcher userProfile={userProfile} refreshProfile={fetchProfile}/>
          <GoogleSheetsConnector userProfile={userProfile} refreshProfile={fetchProfile} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
