"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  MessageSquare,
  Upload,
  User,
  LogOut,
  AlertCircle,
  CheckSquare,
  Shield,
  Bell,
  Menu,
  X,
  BellRing,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function GovernmentPortal() {
  const [selectedTab, setSelectedTab] = useState("welcome");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const renderContent = () => {
    switch (selectedTab) {
      case "schemes":
        return (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Government Schemes
            </h2>
            <p className="text-gray-600 mb-4">
              Browse and apply for available schemes designed to support
              citizens across various sectors.
            </p>
          </section>
        );
      case "exams":
        return (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Competitive Exams
            </h2>
            <p className="text-gray-600 mb-4">
              Register and get updates on government competitive exams.
            </p>
          </section>
        );
      case "notifications":
        return (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Notifications
            </h2>
            <p className="text-gray-600 mb-4">
              Stay informed with the latest official updates and alerts.
            </p>
          </section>
        );
      default:
        return (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Your Government Portal
              </h1>
              <p className="text-gray-600">
                Access personalized government services and information
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <BellRing className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-medium mb-1">
                    Important Announcement
                  </p>
                  <p className="text-blue-700 text-sm">
                    New digital services are now available. Check the latest
                    updates and apply for eligible schemes.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Link href="/schemes" className="block h-full">
                <Card className="hover:shadow-lg group transition cursor-pointer h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold">Government Schemes</h3>
                    <p className="text-gray-600 text-sm">
                      Browse and apply for schemes
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/exam" className="block h-full">
                <Card className="hover:shadow-lg group transition cursor-pointer h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white">
                      <CheckSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold">Competitive Exams</h3>
                    <p className="text-gray-600 text-sm">
                      Register for government exams
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/digitallocker" className="block h-full">
                <Card className="hover:shadow-lg group transition cursor-pointer h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-purple-600 group-hover:text-white">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold">Digital Locker</h3>
                    <p className="text-gray-600 text-sm">
                      Secure document storage
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/alerts" className="block h-full">
                <Card className="hover:shadow-lg group transition cursor-pointer h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="bg-red-100 text-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white">
                      <Bell className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold">Important Alerts</h3>
                    <p className="text-gray-600 text-sm">
                      Stay updated with important notifications
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/documentchecklist" className="block h-full">
                <Card className="hover:shadow-lg group transition cursor-pointer h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-yellow-600 group-hover:text-white">
                      <CheckSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold">Document Checklist</h3>
                    <p className="text-gray-600 text-sm">
                      Required documents for services
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/feedback" className="block h-full">
                <Card className="hover:shadow-lg group transition cursor-pointer h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="bg-teal-100 text-teal-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-teal-600 group-hover:text-white">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold">Feedback</h3>
                    <p className="text-gray-600 text-sm">
                      Share your experience with us
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

            <nav className="hidden md:flex items-center space-x-6">
              {["welcome", "Feddback", "notifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === tab
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <Button
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                onClick={() => router.push("/login")}
              >
                <LogOut className="w-5 h-5 mr-1" /> Logout
              </Button>
            </nav>

            <div className="md:hidden">
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden border-t border-gray-200 py-2">
              {["welcome", "Feedback", "notifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedTab(tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === tab
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <Button
                variant="ghost"
                className="text-red-600 hover:bg-red-50 w-full justify-start"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/login");
                }}
              >
                <LogOut className="w-5 h-5 mr-1" /> Logout
              </Button>
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 flex justify-between items-center">
          <p>© 2025 Government Information Portal. All rights reserved.</p>
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
      </footer>
    </div>
  );
}