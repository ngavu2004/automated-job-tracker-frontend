
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bot, Clock, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpcomingFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Finetuned Model for Classification",
      description: "AI-powered email classification with custom trained models to automatically categorize job application emails with higher accuracy.",
      icon: Bot,
      status: "In Development",
      statusColor: "bg-blue-500",
      benefits: [
        "99% accuracy in email classification",
        "Custom training on job application patterns",
        "Automatic rejection/acceptance detection",
        "Company-specific classification rules"
      ]
    },
    {
      title: "Automated Cron Jobs",
      description: "Schedule automatic email scanning and data synchronization to keep your job tracking up-to-date without manual intervention.",
      icon: Clock,
      status: "Planned",
      statusColor: "bg-orange-500",
      benefits: [
        "Hourly/daily email scanning",
        "Automatic Google Sheets updates",
        "Smart notification system",
        "Customizable schedule settings"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            size="sm"
            className="hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Features</h1>
            <p className="text-gray-600">Exciting new features coming to Job Tracker</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <Badge className={`${feature.statusColor} text-white mt-2`}>
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 mt-3">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-800">Stay Updated</CardTitle>
                <CardDescription className="text-gray-600">
                  Be the first to know when these features are released
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>We're actively working on these features and will notify you once they're ready.</p>
                <p className="mt-1">Expected release: Q3 20255</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Request Early Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpcomingFeatures;
