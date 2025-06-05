'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

axios.defaults.withCredentials = true

const authApi = axios.create({
  withCredentials: true,
  timeout: 10000, // 10 second timeout
})

authApi.interceptors.request.use(
  (config) => {
    // Check for JWT token in localStorage
    const token = localStorage.getItem('jwt_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('JWT token added to request headers')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

authApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - clearing tokens')
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('isAuthenticated')
    }
    return Promise.reject(error)
  }
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  // Check if user is already authenticated on mount (using cookie and JWT)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)

        // First check if we have a JWT token in localStorage
        const jwtToken = localStorage.getItem('jwt_token')
        const userProfileUrl = process.env.NEXT_PUBLIC_USER_PROFILE_URL

        if (!userProfileUrl) {
          console.warn('NEXT_PUBLIC_USER_PROFILE_URL not configured')
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        // Log authentication attempt
        if (jwtToken) {
          console.log('Found JWT token, attempting authentication with token')
        } else {
          console.log('No JWT token found, checking cookie-based auth')
        }

        const response = await authApi.get(userProfileUrl)
        const authenticated = response.status === 200

        // If response includes a JWT token, store it
        if (response.data?.access_token || response.data?.token) {
          const token = response.data.access_token || response.data.token
          localStorage.setItem('jwt_token', token)
          console.log('JWT token received and stored from API response')
        }

        setIsAuthenticated(authenticated)

        // Store auth state in localStorage as backup
        if (authenticated) {
          localStorage.setItem('isAuthenticated', 'true')
          console.log('User authenticated successfully')
        } else {
          localStorage.removeItem('isAuthenticated')
          localStorage.removeItem('jwt_token')
          console.log('User not authenticated')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('jwt_token')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = () => {
    const googleOAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTHENTICATION_URL
    if (!googleOAuthUrl) {
      console.error('NEXT_PUBLIC_GOOGLE_AUTHENTICATION_URL not configured')
      return
    }
    console.log('Redirecting to Google OAuth:', googleOAuthUrl)
    window.location.href = googleOAuthUrl
  }

  const logout = async () => {
    console.log('Clearing all authentication data')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('jwt_token')
    setIsAuthenticated(false)
    router.push('/')

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}