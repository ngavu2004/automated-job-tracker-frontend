
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const GoogleAuthButton = () => {
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    // Simulate Google OAuth login
    console.log("Initiating Google OAuth login...");
    const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTHENTICATION_URL;
    console.log("Redirecting to Google OAuth URL:", googleAuthUrl);
    
    window.location.href = googleAuthUrl;
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
          <Chrome className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Job Tracker
        </CardTitle>
        <CardDescription className="text-gray-600">
          Connect your Google account to manage job applications seamlessly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleGoogleLogin}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <Chrome className="w-5 h-5 mr-3" />
          Continue with Google
        </Button>
        <p className="text-xs text-gray-500 text-center mt-4">
          We'll connect to your Google account to access your specified Google Sheets
        </p>
      </CardContent>
    </Card>
  );
};

export default GoogleAuthButton;
