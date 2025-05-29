
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Mail, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const EmailFetcher = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchLog, setFetchLog] = useState<string[]>([]);
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [fetchFromTime, setFetchFromTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const { toast } = useToast();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile from:", import.meta.env.VITE_USER_PROFILE_URL);
        const response = await fetch(import.meta.env.VITE_USER_PROFILE_URL, { credentials: "include" });
        const data = await response.json();
        console.log("User profile data:", data);
        
        setIsFirstTimeUser(data.first_time_user);
      } catch (error) {
        // Handle error or assume first time
        setIsFirstTimeUser(true);
      }
    };
    fetchProfile();
  }, []);

  const handleFetchJobs = async () => {
    if (isFirstTimeUser) {
      setShowTimeInput(true);
      return;
    }

    setIsFetching(true);
    const dateString = selectedDate ? format(selectedDate, "PPP") : fetchFromTime;
    console.log("Fetching jobs from email...", dateString ? `from ${dateString}` : "");
    
    // Simulate email fetching
    try {
      const response = await fetch(import.meta.env.VITE_EMAIL_FETCH_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch job applications from email");
      }
      
      setIsFetching(false);
      setShowTimeInput(false);
      setFetchFromTime("");
      setSelectedDate(undefined);
      
      toast({
        title: "Jobs Fetched Successfully!",
      });
      console.log("Successfully fetched job updates from email");
    } catch (error) {
      setIsFetching(false);
      toast({
        title: "Error Fetching Jobs",
        description: (error as Error).message,
        variant: "destructive",
      });
      console.error("Error fetching job updates from email:", error);
    }
  };

  const handleTimeSubmit = () => {
    if (!fetchFromTime.trim() && !selectedDate) {
      toast({
        title: "Invalid Selection",
        description: "Please enter a time or select a date to fetch from",
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
                    Please specify when to start fetching job emails from using the date picker or text input below
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Select a date to fetch from
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-2 border-gray-200 focus:border-blue-500",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date > new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
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
                    <CalendarIcon className="w-4 h-4 mr-2" />
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
