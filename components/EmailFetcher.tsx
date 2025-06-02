/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Mail, Calendar as CalendarIcon, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import axios from 'axios'

interface UserProfile {
  sheet_id?: string
  first_time_user?: boolean
}

interface EmailFetcherProps {
  userProfile: UserProfile | null
  refreshProfile: () => void
}

const EmailFetcher = ({ userProfile, refreshProfile }: EmailFetcherProps) => {
  const [isFetching, setIsFetching] = useState(false)
  const [fetchLog, setFetchLog] = useState<string[]>([])
  const [showTimeInput, setShowTimeInput] = useState(false)
  const [fetchFromTime, setFetchFromTime] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [taskStatus, setTaskStatus] = useState<
    'PENDING' | 'STARTED' | 'FAILURE' | 'SUCCESS' | 'RETRY' | 'REVOKED'
  >('SUCCESS')

  useEffect(() => {
    // check for a pending task ID and resume polling
    const pendingTaskId = localStorage.getItem('pendingTaskId')
    if (pendingTaskId) {
      setTaskId(pendingTaskId)
      setIsFetching(true)
      setTaskStatus('PENDING')
    }

    if (!isFetching) {
      refreshProfile()
    }
  }, [refreshProfile, isFetching])

  useEffect(() => {
    if (!taskId || !isFetching) return

    const interval = setInterval(async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        if (!backendUrl) {
          throw new Error('Backend URL not configured')
        }

        const response = await axios.get(`${backendUrl}/task_status/${taskId}/`)
        setTaskStatus(response.data.status)
        console.log('Current task status:', response.data.status)

        if (
          response.data.status.toUpperCase() === 'FAILURE' ||
          response.data.status.toUpperCase() === 'SUCCESS'
        ) {
          setIsFetching(false)
          localStorage.removeItem('pendingTaskId')
          clearInterval(interval)
          toast.dismiss()
        }
      } catch (error) {
        setIsFetching(false)
        localStorage.removeItem('pendingTaskId')
        clearInterval(interval)
        toast.error('Error fetching task status: ' + (error as Error).message)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [taskId, isFetching])

  useEffect(() => {
    // Check if user is first time user
    setIsFirstTimeUser(userProfile?.first_time_user || true)
  }, [userProfile])

  const handleFetchJobs = async (skipFirstTimeCheck = false) => {
    // Check if user has connected a Google Sheet
    if (!userProfile?.sheet_id) {
      toast.error(
        'Please connect a Google Sheet first to fetch jobs from email.',
      )
      return
    }

    if (isFirstTimeUser && !skipFirstTimeCheck) {
      setShowTimeInput(true)
      return
    }

    setIsFetching(true)

    try {
      const emailFetchUrl = process.env.NEXT_PUBLIC_EMAIL_FETCH_URL
      if (!emailFetchUrl) {
        throw new Error('Email fetch URL not configured')
      }

      const response = await axios.post(emailFetchUrl)

      if (!response || response.status !== 200) {
        const errorData = response.data || {}
        throw new Error(errorData.message || 'Failed to fetch jobs from email')
      }

      if (response.data.task_id) {
        localStorage.setItem('pendingTaskId', response.data.task_id)
        setTaskId(response.data.task_id)
        setTaskStatus('PENDING')
      }
    } catch (error) {
      setIsFetching(false)
      toast.error('Error fetching jobs: ' + (error as Error).message)
    }
  }

  const addFetchLog = async (lastFetchDate: string) => {
    const addFetchLogUrl = process.env.NEXT_PUBLIC_ADD_FETCHLOG_URL
    if (!addFetchLogUrl) {
      throw new Error('Add fetch log URL not configured')
    }

    const response = await axios.post(addFetchLogUrl, {
      last_fetch_date: lastFetchDate,
    })

    refreshProfile()
    return response.data
  }

  const handleTimeSubmit = async () => {
    if (!fetchFromTime.trim() && !selectedDate) {
      toast.error('Please select a date to fetch from.')
      return
    }

    try {
      const lastFetchDate = selectedDate
        ? format(selectedDate, 'yyyy-MM-dd')
        : fetchFromTime
      await addFetchLog(lastFetchDate)
      setShowTimeInput(false)
      setIsFirstTimeUser(false)
      handleFetchJobs(true)
    } catch (error) {
      toast.error('Error adding fetch log: ' + (error as Error).message)
    }
  }

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
            onClick={() => handleFetchJobs()}
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
                  <p className="font-medium text-amber-800 mb-1">
                    First Time Setup
                  </p>
                  <p className="text-sm text-amber-700">
                    Please specify when to start fetching job emails from using
                    the date picker
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
                        'w-full h-12 justify-start text-left font-normal border-2 border-gray-200 focus:border-blue-500',
                        !selectedDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, 'PPP')
                        : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date > new Date()}
                      initialFocus
                      className="p-3"
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
                <div
                  key={index}
                  className="text-sm text-gray-600 p-2 bg-gray-50 rounded border-l-4 border-blue-500"
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EmailFetcher
