// components/RouteGuard.tsx
'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type RouteType = 'public' | 'protected' | 'any';

interface RouteGuardProps {
    children: React.ReactNode;
    type: RouteType;
    redirectTo?: string;
    fallback?: React.ReactNode;
}

const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
    </div>
);

export function RouteGuard({
    children,
    type,
    redirectTo,
    fallback
}: RouteGuardProps) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    // Immediate check on mount to prevent flash
    useEffect(() => {
        const localAuth = localStorage.getItem('isAuthenticated') === 'true';
        const hasJwtToken = !!localStorage.getItem('jwt_token');

        console.log('RouteGuard - Immediate check:', {
            type,
            localAuth,
            hasJwtToken,
            loading,
            isAuthenticated,
            pathname: window.location.pathname
        });

        if (type === 'protected' && !localAuth && !hasJwtToken && !loading) {
            console.log('RouteGuard - Immediate redirect: No auth tokens found');
            setIsRedirecting(true);
            router.replace(redirectTo || '/');
            return;
        }

        if (type === 'public' && localAuth && !loading) {
            console.log('RouteGuard - Immediate redirect: Already authenticated');
            setIsRedirecting(true);
            router.replace(redirectTo || '/dashboard');
            return;
        }
    }, []);

    useEffect(() => {
        if (loading || isRedirecting) return;

        console.log('RouteGuard - Auth check after loading:', {
            type,
            isAuthenticated,
            loading,
            isRedirecting,
            hasCheckedAuth,
            pathname: window.location.pathname
        });

        switch (type) {
            case 'protected':
                if (!isAuthenticated) {
                    console.log('RouteGuard - Final check: User not authenticated, redirecting');
                    setIsRedirecting(true);
                    router.replace(redirectTo || '/');
                } else {
                    console.log('RouteGuard - User authenticated, allowing access');
                    setHasCheckedAuth(true);
                }
                break;

            case 'public':
                if (isAuthenticated) {
                    console.log('RouteGuard - User authenticated, redirecting from public route');
                    setIsRedirecting(true);
                    router.replace(redirectTo || '/dashboard');
                } else {
                    console.log('RouteGuard - User not authenticated, allowing public access');
                    setHasCheckedAuth(true);
                }
                break;

            case 'any':
                console.log('RouteGuard - Any route, always allowing access');
                setHasCheckedAuth(true);
                break;
        }
    }, [isAuthenticated, loading, router, type, redirectTo, isRedirecting]);

    // Show loading while checking or redirecting
    if (loading || isRedirecting || !hasCheckedAuth) {
        return fallback || <LoadingSpinner />;
    }

    // Final protection check
    if (type === 'protected' && !isAuthenticated) {
        console.log('RouteGuard - Final render check: Blocking protected content');
        return null;
    }

    if (type === 'public' && isAuthenticated) {
        console.log('RouteGuard - Final render check: Blocking public content for authenticated user');
        return null;
    }

    console.log('RouteGuard - Rendering children');
    return <>{children}</>;
}

// Enhanced Auth Context Hook for better debugging
export const useAuthDebug = () => {
    const auth = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            const localAuth = localStorage.getItem('isAuthenticated');
            const jwtToken = localStorage.getItem('jwt_token');

            console.log('Auth Debug - Periodic check:', {
                contextAuth: auth.isAuthenticated,
                contextLoading: auth.loading,
                localStorageAuth: localAuth,
                hasJwtToken: !!jwtToken,
                timestamp: new Date().toISOString()
            });
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [auth]);

    return auth;
};

// Convenience wrapper components
export const ProtectedRoute = ({ children, redirectTo = '/', fallback }: Omit<RouteGuardProps, 'type'>) => (
    <RouteGuard type="protected" redirectTo={redirectTo} fallback={fallback}>
        {children}
    </RouteGuard>
);

export const PublicRoute = ({ children, redirectTo = '/dashboard', fallback }: Omit<RouteGuardProps, 'type'>) => (
    <RouteGuard type="public" redirectTo={redirectTo} fallback={fallback}>
        {children}
    </RouteGuard>
);

export const AnyRoute = ({ children, fallback }: Omit<RouteGuardProps, 'type' | 'redirectTo'>) => (
    <RouteGuard type="any" fallback={fallback}>
        {children}
    </RouteGuard>
);