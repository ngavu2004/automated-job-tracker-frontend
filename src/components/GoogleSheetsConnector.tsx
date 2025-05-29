
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, CheckCircle, AlertCircle, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmailFetcher from "./EmailFetcher";

interface GoogleSheetsConnectorProps {
  onLogout: () => void;
}

const GoogleSheetsConnector = ({ onLogout }: GoogleSheetsConnectorProps) => {
  const [sheetUrl, setSheetUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!sheetUrl.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Google Sheets URL",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    console.log("Connecting to Google Sheet:", sheetUrl);
    
    // Connect to Google Sheets API
    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_SHEET_UPDATE_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ google_sheet_url: sheetUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to Google Sheet");
      }

      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Your Google Sheet has been connected successfully",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSheetUrl("");
    toast({
      title: "Disconnected",
      description: "Your Google Sheet has been disconnected",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your job application tracking</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="space-y-6">
          <EmailFetcher />

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Sheet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Google Sheets Integration
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Connect your Google Sheet to track job application status
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sheet-url" className="text-sm font-medium text-gray-700">
                      Google Sheets URL
                    </Label>
                    <Input
                      id="sheet-url"
                      type="url"
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      value={sheetUrl}
                      onChange={(e) => setSheetUrl(e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste the URL of your Google Sheet where you want to track job applications
                    </p>
                  </div>

                  <Button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Sheet className="w-5 h-5 mr-3" />
                        Connect Google Sheet
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-800">Sheet Connected Successfully!</p>
                      <p className="text-sm text-green-600 truncate">{sheetUrl}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800 mb-2">How it works:</p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Use the Email Fetcher above to scan for job application updates</li>
                          <li>• Status changes will be automatically updated in your Google Sheet</li>
                          <li>• You'll receive notifications for any updates</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleDisconnect}
                    variant="outline"
                    className="w-full h-10 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                  >
                    Disconnect Sheet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsConnector;
