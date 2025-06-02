'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bot, Clock, Zap, Star } from 'lucide-react'

const UpcomingFeatures = () => {
  const router = useRouter()

  const features = [
    {
      title: 'Finetuned Model for Classification',
      description:
        'AI-powered email classification with custom trained models to automatically categorize job application emails with higher accuracy.',
      icon: Bot,
      status: 'In Development',
      statusColor: 'bg-blue-500',
      benefits: [
        'Higher accuracy on your specific task',
        'Custom training on job application patterns',
        'Automatic rejection/acceptance detection',
        'Privacy control',
      ],
    },
    {
      title: 'Automated Cron Jobs',
      description:
        'Schedule automatic email scanning and data synchronization to keep your job tracking up-to-date without manual intervention.',
      icon: Clock,
      status: 'Planned',
      statusColor: 'bg-orange-500',
      benefits: [
        'Hourly/daily email scanning',
        'Automatic Google Sheets updates',
        'Smart notification system',
        'Customizable schedule settings',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto pt-4 sm:pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8 pointer-events-auto">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            size="sm"
            className="hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              Upcoming Features
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Exciting new features coming to Job Tracker
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                      <feature.icon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg sm:text-xl leading-tight">
                        {feature.title}
                      </CardTitle>
                      <Badge
                        className={`${feature.statusColor} text-white mt-2 text-xs`}
                      >
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-start gap-2 text-xs sm:text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="pb-3 sm:pb-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-lg sm:text-xl text-gray-800">
                  Stay Updated
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  Be the first to know when these features are released
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-4">
              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <p>
                  We're actively working on these features and will notify you
                  once they're ready.
                </p>
                <p>Expected release: Q3 2025</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 w-full sm:w-auto sm:self-start text-sm">
                Request Early Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UpcomingFeatures
