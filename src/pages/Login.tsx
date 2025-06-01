
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { useAuth } from "@/context/AuthContext";
import { Play } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Login form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Job Tracker
              </h1>
              <p className="text-lg text-gray-600">
                Streamline your job application process with automated email tracking and Google Sheets integration
              </p>
            </div>
            
            <GoogleAuthButton />
            
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>✓ Email scanning</span>
                <span>✓ Auto-updates</span>
                <span>✓ Google Sheets sync</span>
              </div>
            </div>
          </div>

          {/* Right side - Workflow demo */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">See How It Works</h2>
                  <p className="text-gray-600">Watch the complete workflow in action</p>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
                {/* Placeholder for GIF - replace src with your actual GIF URL */}
                <img 
                  src="/workflow-demo.gif" 
                  alt="Job Tracker workflow demonstration"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if GIF doesn't exist
                    e.currentTarget.style.display = 'none';
                    const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallbackElement) {
                      fallbackElement.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback content */}
                <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Workflow Demo</p>
                    <p className="text-sm text-gray-500 mt-2">
                      1. Connect your Google account<br/>
                      2. Link your Google Sheets<br/>
                      3. Fetch job emails automatically<br/>
                      4. View organized data
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Automated email scanning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Real-time Google Sheets sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Smart data extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Organized tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
