
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailFetcher = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchLog, setFetchLog] = useState<string[]>([]);
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [fetchFromTime, setFetchFromTime] = useState("");
  const { toast } = useToast();

  const handleFetchJobs = async () => {
    if (fetchLog.length === 0 && !fetchFromTime) {
      setShowTimeInput(true);
      return;
    }

    setIsFetching(true);
    console.log("Fetching jobs from email...", fetchFromTime ? `from ${fetchFromTime}` : "");
    
    // Simulate email fetching
    setTimeout(() => {
      const newLog = [
        `Fetched 3 job applications from Gmail ${fetchFromTime ? `(from ${fetchFromTime})` : ""}`,
        "Found: Software Engineer at Tech Corp - Interview Scheduled",
        "Found: Frontend Developer at StartupXYZ - Application Received",
        "Found: Full Stack Developer at BigCorp - Rejected"
      ];
      
      setFetchLog(prev => [...newLog, ...prev]);
      setIsFetching(false);
      setShowTimeInput(false);
      setFetchFromTime("");
      
      toast({
        title: "Jobs Fetched Successfully!",
        description: "Found 3 job application updates from your email",
      });
      console.log("Successfully fetched job updates from email");
    }, 2000);
  };

  const handleTimeSubmit = () => {
    if (!fetchFromTime.trim()) {
      toast({
        title: "Invalid Time",
        description: "Please enter a valid time to fetch from",
        variant: "destructive",
      });
      return;
    }
    handleFetchJobs();
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Email Job Fetcher
            </CardTitle>
            <CardDescription className="text-gray-600">
              Scan your emails for job application updates
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showTimeInput ? (
          <Button
            onClick={handleFetchJobs}
            disabled={isFetching}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            {isFetching ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Fetching Jobs...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-3" />
                Fetch Jobs from Email
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 mb-1">First Time Setup</p>
                  <p className="text-sm text-amber-700">
                    Please specify when to start fetching job emails from (e.g., "last week", "January 1, 2024", "2 months ago")
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fetch-time" className="text-sm font-medium text-gray-700">
                Fetch emails from
              </Label>
              <Input
                id="fetch-time"
                type="text"
                placeholder="e.g., last week, January 1, 2024, 2 months ago"
                value={fetchFromTime}
                onChange={(e) => setFetchFromTime(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleTimeSubmit}
                disabled={isFetching}
                className="flex-1 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {isFetching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Fetching...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Start Fetching
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowTimeInput(false)}
                variant="outline"
                className="h-10 px-6"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {fetchLog.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Fetch Log</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {fetchLog.map((log, index) => (
                <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded border-l-4 border-blue-500">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailFetcher;
