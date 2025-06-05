/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAuth } from '@/context/AuthContext'
import GoogleSheetsConnector from '@/components/GoogleSheetsConnector'
import EmailFetcher from '@/components/EmailFetcher'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

interface UserProfile {
    sheet_id?: string
    first_time_user?: boolean
    [key: string]: any
}

// Configure axios defaults
axios.defaults.withCredentials = true

const Dashboard = () => {
    const { logout } = useAuth()
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

    const handleLogout = () => {
        logout()
    }

    const fetchProfile = useCallback(async () => {
        try {
            const userProfileUrl = process.env.NEXT_PUBLIC_USER_PROFILE_URL
            if (!userProfileUrl) {
                console.error('User profile URL not configured')
                return
            }

            const response = await axios.get(userProfileUrl)
            setUserProfile(response.data)
        } catch (error) {
            console.error('Error fetching user profile:', error)
            setUserProfile(null)
        }
    }, [])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-2xl mx-auto pt-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
                        <p className="text-gray-600">
                            Manage your job application tracking
                        </p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
                <div className="space-y-6">
                    <EmailFetcher
                        userProfile={userProfile}
                        refreshProfile={fetchProfile}
                    />
                    <GoogleSheetsConnector
                        userProfile={userProfile}
                        refreshProfile={fetchProfile}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
