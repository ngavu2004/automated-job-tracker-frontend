
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "@/components/GoogleAuthButton";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log("Login successful, redirecting to dashboard...");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Job Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Streamline your job application process with automated email tracking and Google Sheets integration
          </p>
        </div>
        
        <GoogleAuthButton onLoginSuccess={handleLoginSuccess} />
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>✓ Email scanning</span>
            <span>✓ Auto-updates</span>
            <span>✓ Google Sheets sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
