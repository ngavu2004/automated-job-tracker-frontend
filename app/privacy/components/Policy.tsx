'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield, Mail, FileSpreadsheet, Eye, Lock, Trash2, UserCheck } from 'lucide-react'

export default function PrivacyPolicy() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={() => router.back()}
                            variant="ghost"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                        <div className="flex items-center gap-2">
                            <Shield className="w-6 h-6 text-blue-600" />
                            <span className="font-semibold text-gray-800">Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Introduction
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Job Tracker (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                                information when you use our job application tracking service. Please read this
                                privacy policy carefully.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Eye className="w-6 h-6 text-blue-600" />
                                Information We Collect
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                        Email Data
                                    </h3>
                                    <p className="text-gray-600">
                                        We access and scan your Gmail account to identify job-related emails,
                                        including application confirmations, interview invitations, rejection
                                        notices, and other job correspondence. We only process emails that
                                        contain job-related keywords and content.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        <FileSpreadsheet className="w-5 h-5 text-green-600" />
                                        Google Sheets Integration
                                    </h3>
                                    <p className="text-gray-600">
                                        We access your Google Sheets to create and update spreadsheets with
                                        your job application data. This includes company names, job titles,
                                        application dates, status updates, and contact information.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        <UserCheck className="w-5 h-5 text-purple-600" />
                                        Account Information
                                    </h3>
                                    <p className="text-gray-600">
                                        We collect basic Google account information including your name,
                                        email address, and profile information necessary to authenticate
                                        and provide our services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                How We Use Your Information
                            </h2>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Scan your emails to identify job-related correspondence</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Extract relevant job information such as company names, positions, and status</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Organize and update your job tracking spreadsheet in Google Sheets</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Provide you with a centralized dashboard to manage your job applications</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Improve our service functionality and user experience</span>
                                </li>
                            </ul>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Lock className="w-6 h-6 text-green-600" />
                                Data Security
                            </h2>
                            <div className="bg-green-50 p-6 rounded-lg">
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We implement appropriate technical and organizational security measures
                                    to protect your personal information against unauthorized access,
                                    alteration, disclosure, or destruction.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• All data transmission is encrypted using industry-standard protocols</li>
                                    <li>• We use OAuth 2.0 for secure Google account authentication</li>
                                    <li>• Your email data is processed temporarily and not permanently stored</li>
                                    <li>• Access to your data is limited to essential service functionality</li>
                                </ul>
                            </div>
                        </section>

                        {/* Data Sharing */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Data Sharing and Disclosure
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to
                                third parties except in the following circumstances:
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>• With your explicit consent</li>
                                <li>• To comply with legal obligations or court orders</li>
                                <li>• To protect our rights, property, or safety, or that of others</li>
                                <li>• In connection with a business transfer or merger</li>
                            </ul>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Your Rights and Choices
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-2">Access and Control</h3>
                                    <p className="text-sm text-gray-600">
                                        You can revoke access to your Google account at any time through
                                        your Google Account settings.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-2">Data Deletion</h3>
                                    <p className="text-sm text-gray-600">
                                        You may request deletion of your data by contacting us directly.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-2">Data Portability</h3>
                                    <p className="text-sm text-gray-600">
                                        Your job tracking data remains accessible in your Google Sheets.
                                    </p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-2">Corrections</h3>
                                    <p className="text-sm text-gray-600">
                                        You can modify or correct your data directly in your Google Sheets.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Google API Compliance */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Google API Services Compliance
                            </h2>
                            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Job Tracker&apos;s use and transfer of information received from Google APIs
                                    adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy"
                                        className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                        Google API Services User Data Policy</a>, including the Limited Use requirements.
                                </p>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li>• We only access the minimum necessary scope of your Google data</li>
                                    <li>• Your data is used solely for providing job tracking functionality</li>
                                    <li>• We do not use your data for advertising or marketing purposes</li>
                                    <li>• Data access is limited to essential service operations</li>
                                </ul>
                            </div>
                        </section>

                        {/* Data Retention */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Trash2 className="w-6 h-6 text-red-600" />
                                Data Retention
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We retain your personal information only as long as necessary to provide
                                our services. Email data is processed in real-time and not stored permanently.
                                Job tracking data is maintained in your Google Sheets under your control.
                                You may delete your account and associated data at any time.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Contact Us
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-600 mb-4">
                                    If you have questions about this Privacy Policy or our data practices,
                                    please contact us:
                                </p>
                                <div className="space-y-2 text-gray-600">
                                    <p>Email: vuthiquynhnga4@gmail.com</p>
                                </div>
                            </div>
                        </section>

                        {/* Updates */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Policy Updates
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you
                                of any changes by posting the new Privacy Policy on this page and updating
                                the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy
                                periodically for any changes.
                            </p>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                        <p className="text-gray-500 text-sm">
                            By using Job Tracker, you acknowledge that you have read and understood
                            this Privacy Policy and agree to its terms.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}