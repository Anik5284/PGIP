"use client"

import { useState } from "react"
import { FileText, MessageSquare, Upload, User, LogOut, AlertTriangle, CheckSquare } from "lucide-react"
import {Button} from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"



export default function GovernmentPortal() {
  const [selectedTab, setSelectedTab] = useState("welcome")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header Navigation */}
      <header className="bg-white/50 backdrop-blur-sm shadow-lg rounded-b-3xl mx-4 mt-4">
        <nav className="flex flex-wrap items-center justify-between p-4 md:px-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-8 text-sm md:text-base font-medium">
            <button
              onClick={() => setSelectedTab("welcome")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                selectedTab === "welcome" ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Welcome To Personalized Government Info Portal
            </button>
            <span className="hidden md:inline text-gray-400">|</span>
            <button
              onClick={() => setSelectedTab("schemes")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                selectedTab === "schemes" ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Schemes
            </button>
            <span className="hidden md:inline text-gray-400">|</span>
            <button
              onClick={() => setSelectedTab("exams")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                selectedTab === "exams" ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Exams
            </button>
            <span className="hidden md:inline text-gray-400">|</span>
            <button
              onClick={() => setSelectedTab("notifications")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                selectedTab === "notifications"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Notifications
            </button>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Personalized Government Info Portal
          </h1>
        </div>

        {/* Announcement Banner */}
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl p-4 mb-8 shadow-xl">
            <div className="overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                <p className="text-white font-semibold text-lg inline-block">
                  📢 Announcement: Moving Text - Text passing Right to Left
                </p>
              </div>
            </div>
          </div>



        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Highlights of Services */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">Highlights of Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-400 to-emerald-500 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Schemes</h3>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-400 to-indigo-500 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Exams</h3>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-400 to-pink-500 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Digital Locker</h3>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-red-400 to-rose-500 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Alerts</h3>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <CheckSquare className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Documents Checklist</h3>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-teal-400 to-cyan-500 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">FeedBack</h3>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl sticky top-8">
              <CardContent className="p-6">
                {/* Upload Photo */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <User className="w-10 h-10 text-gray-600" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Upload Photo</p>
                </div>

                {/* User Details */}
              <div className="space-y-3 text-sm">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-md">
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">Name:</label>
                     <input
                         type="text"
                        className="w-full bg-transparent border-0 focus:outline-none text-gray-800 text-sm py-1"
                        placeholder="Enter your name"
                       />
                </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-2 rounded-md">
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">Email:</label>
                      <input
                          type="email"
                              className="w-full bg-transparent border-0 focus:outline-none text-gray-800 text-sm py-1"
                             placeholder="Enter your email"
                      />
                 </div>
                </div>
                {/* Logout Button */}
                <Button className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
