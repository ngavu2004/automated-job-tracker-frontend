import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers/Providers'
import Link from 'next/link' // Add this import


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Tracker',
  description:
    'Streamline your job application process with automated email tracking and Google Sheets integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Privacy note */}
        <div style={{ background: '#f9fafb', padding: '0.75rem', textAlign: 'center', fontSize: '0.95rem' }}>
          The main page doesn&apos;t collect personal data. Please refer to{' '}
          <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Privacy Policy
          </Link>{' '}
          to learn more.
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
