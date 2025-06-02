'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults
axios.defaults.withCredentials = true;

// Create axios instance for auth operations
const authApi = axios.create({
    withCredentials: true,
    timeout: 10000, // 10 second timeout
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // Check if user is already authenticated on mount (using cookie)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const userProfileUrl = process.env.NEXT_PUBLIC_USER_PROFILE_URL;
                if (!userProfileUrl) {
                    console.warn('NEXT_PUBLIC_USER_PROFILE_URL not configured');
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                const response = await authApi.get(userProfileUrl);
                const authenticated = response.status === 200;
                setIsAuthenticated(authenticated);

                // Optional: If you want to store auth state in localStorage as backup
                if (authenticated) {
                    localStorage.setItem("isAuthenticated", "true");
                } else {
                    localStorage.removeItem("isAuthenticated");
                }

            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
                localStorage.removeItem("isAuthenticated");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = () => {
        // In a real app, this would validate Google OAuth tokens
        const googleOAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTHENTICATION_URL;
        if (!googleOAuthUrl) {
            console.error('NEXT_PUBLIC_GOOGLE_OAUTH_URL not configured');
            return;
        }
        window.location.href = googleOAuthUrl;
    };

    const logout = async () => {
        // Clear local state regardless of API call success
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        router.push("/");

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};