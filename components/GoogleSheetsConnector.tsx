/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

interface UserProfile {
  sheet_id?: string
  [key: string]: any
}

interface GoogleSheetsConnectorProps {
  userProfile: UserProfile | null
  refreshProfile: () => Promise<void>
}

const GoogleSheetsConnector = ({
  userProfile,
  refreshProfile,
}: GoogleSheetsConnectorProps) => {
  const [sheetUrl, setSheetUrl] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // Fetch user profile on mount and set sheetUrl if present
  useEffect(() => {
    if (userProfile?.sheet_id) {
      setSheetUrl(
        `https://docs.google.com/spreadsheets/d/${userProfile.sheet_id}`,
      )
      setIsConnected(true)
    } else {
      setSheetUrl('')
      setIsConnected(false)
    }
  }, [userProfile])

  const handleConnect = async () => {
    if (!sheetUrl.trim()) {
      toast.error('Please enter a valid Google Sheets URL')
      return
    }

    setIsConnecting(true)

    // Connect to Google Sheets API
    try {
      const googleSheetUpdateUrl =
        process.env.NEXT_PUBLIC_GOOGLE_SHEET_UPDATE_URL
      if (!googleSheetUpdateUrl) {
        throw new Error('Google Sheet update URL not configured')
      }

      const response = await axios.post(googleSheetUpdateUrl, {
        google_sheet_url: sheetUrl,
      })

      if (!response || response.status !== 200) {
        const errorData = response.data || {}
        throw new Error(
          errorData.message || 'Failed to connect to Google Sheet',
        )
      }

      setIsConnected(true)
      toast.success('Google Sheet connected successfully!')
      await refreshProfile()
    } catch (error) {
      toast.error(
        `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      // const googleSheetUpdateUrl =
      //   process.env.NEXT_PUBLIC_GOOGLE_SHEET_UPDATE_URL
      // if (googleSheetUpdateUrl) {
      //   // Call API to disconnect the sheet
      //   await axios.delete(googleSheetUpdateUrl)
      // }
      setIsConnected(false)
      setSheetUrl('')
      await refreshProfile()
      toast.success('Google Sheet disconnected successfully!')
    } catch (error) {
      // Still update UI even if API call fails
      setIsConnected(false)
      setSheetUrl('')
      toast.error(
        `Failed to disconnect: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  return (
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
              <Label
                htmlFor="sheet-url"
                className="text-sm font-medium text-gray-700"
              >
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
                Paste the URL of your Google Sheet where you want to track job
                applications
              </p>
            </div>

            <Button
              onClick={handleConnect}
              disabled={isConnecting || !sheetUrl.trim()}
              className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:transform-none disabled:hover:scale-100"
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
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-green-800">
                  Sheet Connected Successfully!
                </p>
                <p className="text-sm text-green-600 truncate">{sheetUrl}</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-blue-800 mb-2">
                    How it works:
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Use the Email Fetcher to scan for job application
                      updates
                    </li>
                    <li>
                      • Status changes will be automatically updated in your
                      Google Sheet
                    </li>
                    <li>• You&apos;ll receive notifications for any updates</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="w-full h-10 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <Sheet className="w-4 h-4 mr-2" />
              Disconnect Sheet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GoogleSheetsConnector
