"use client";

import { useState } from "react";
import {
  FileText,
  MessageSquare,
  Upload,
  User,
  LogOut,
  AlertTriangle,
  CheckSquare,
  Shield,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function GovernmentPortal() {
  const [selectedTab, setSelectedTab] = useState("welcome");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white rounded-lg p-2">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Government Information Portal
                </h1>
                <p className="text-sm text-gray-600">
                  Secure • Reliable • Official
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setSelectedTab("welcome")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === "welcome"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setSelectedTab("schemes")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === "schemes"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Schemes
              </button>
              <button
                onClick={() => setSelectedTab("exams")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === "exams"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Exams
              </button>
              <button
                onClick={() => setSelectedTab("notifications")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === "notifications"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Notifications
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-2">
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => {
                    setSelectedTab("welcome");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === "welcome"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setSelectedTab("schemes");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === "schemes"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  Schemes
                </button>
                <button
                  onClick={() => {
                    setSelectedTab("exams");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === "exams"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  Exams
                </button>
                <button
                  onClick={() => {
                    setSelectedTab("notifications");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === "notifications"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  Notifications
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Government Portal
          </h1>
          <p className="text-gray-600">
            Access personalized government services and information
          </p>
        </div>

        {/* Announcement Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Bell className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium mb-1">
                Important Announcement
              </p>
              <p className="text-blue-700 text-sm">
                New digital services are now available. Check the latest updates
                and apply for eligible schemes.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Government Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Government Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="gov-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Government Schemes
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Browse and apply for government schemes
                    </p>
                  </CardContent>
                </Card>

                <Card className="gov-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <CheckSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Competitive Exams
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Register for government exams
                    </p>
                  </CardContent>
                </Card>

                <Card className="gov-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Digital Locker
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Secure document storage
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="gov-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-red-100 text-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <AlertTriangle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Important Alerts
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Stay updated with important notifications
                    </p>
                  </CardContent>
                </Card>

                <Card className="gov-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                      <CheckSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Document Checklist
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Required documents for services
                    </p>
                  </CardContent>
                </Card>

                <Card className="gov-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-teal-100 text-teal-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Feedback
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Share your experience with us
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="gov-card sticky top-8">
              <CardContent className="p-6">
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                      <User className="w-10 h-10 text-gray-600" />
                    </div>
                    <Button className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Upload Photo
                  </p>
                </div>

                {/* User Details Form */}
                <div className="space-y-5">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="gov-input w-full px-3 py-2.5 text-sm rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="gov-input w-full px-3 py-2.5 text-sm rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Logout Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Button className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2024 Government Information Portal. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-gray-900">
                Terms of Service
              </a>
              <a href="/help" className="hover:text-gray-900">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
