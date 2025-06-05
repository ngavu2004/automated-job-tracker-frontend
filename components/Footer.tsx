'use client'

import { useRouter } from 'next/navigation'

interface FooterProps {
    className?: string
}

export default function Footer({ className = "" }: FooterProps) {
    const router = useRouter()

    return (
        <div className={`text-center ${className}`}>
            <div className="text-xs text-gray-400 space-x-4">
                <button
                    onClick={() => router.push('/privacy')}
                    className="hover:text-gray-600 transition-colors underline-offset-2 hover:underline"
                >
                    Privacy Policy
                </button>
                <span>•</span>
                <span>© 2025 Job Tracker</span>
            </div>
        </div>
    )
}