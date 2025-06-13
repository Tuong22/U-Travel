"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "antd"

export default function PlaningSidebar({ activeSection, setActiveSection, scrollToSection }) {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    explore: false,
    itinerary: true,
    budget: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const itineraryDates = [
    { date: "Fri 6/13", day: "Friday, June 13th", collapsed: false },
    { date: "Sat 6/14", day: "Saturday, June 14th", collapsed: false },
    { date: "Sun 6/15", day: "Sunday, June 15th", collapsed: true },
    { date: "Mon 6/16", day: "Monday, June 16th", collapsed: true },
  ]

  return (
    <div className="w-44 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col">
      <div className="p-3"></div>

      {/* Navigation */}
      <div className="flex-1 px-2 pb-2">
        <div className="space-y-1">
          {/* Overview */}
          <div>
            <Button
              type="text"
              className={`w-full h-12 px-2 font-bold text-lg justify-start items-center ${
                activeSection === "overview" ||
                activeSection === "explore" ||
                activeSection === "notes" ||
                activeSection === "places"
                  ? "!bg-gray-900 !text-white"
                  : "text-gray-700 hover:text-gray-600"
              }`}
              onClick={() => {
                scrollToSection("overview")
              }}
            >
              <Button
                className="p-0 m-0 !text-inherit !bg-transparent shadow-none border-none"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleSection("overview")
                }}
              >
                {expandedSections.overview ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
              <span className="font-semibold">Overview</span>
            </Button>

            {expandedSections.overview && (
              <div className="ml-7 mt-2 mb-4 space-y-4">
                <Button
                  type="text"
                  size="small"
                  className={`w-full justify-start text-sm ${
                    activeSection === "explore" ? "text-black font-bold" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => scrollToSection("explore")}
                >
                  Explore
                </Button>
                <Button
                  type="text"
                  size="small"
                  className={`w-full justify-start text-sm ${
                    activeSection === "notes" ? "text-black font-bold" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => scrollToSection("notes")}
                >
                  Notes
                </Button>
                <Button
                  type="text"
                  size="small"
                  className={`w-full justify-start text-sm ${
                    activeSection === "places" ? "text-black font-bold" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => scrollToSection("places")}
                >
                  Places to visit
                </Button>
              </div>
            )}
          </div>

          {/* Itinerary */}
          <div className="mt-3">
            <Button
              type="text"
              className={`w-full h-12 px-2 font-bold text-lg justify-start ${
                activeSection === "itinerary" || activeSection.startsWith("itinerary-day-")
                  ? "!bg-gray-900 !text-white"
                  : "text-gray-700 hover:text-gray-600"
              }`}
              onClick={() => {
                scrollToSection("itinerary")
              }}
            >
              <Button
                className="p-0 m-0 !text-inherit !bg-transparent shadow-none border-none"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleSection("itinerary")
                }}
              >
                {expandedSections.itinerary ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
              <span className="font-semibold">Itinerary</span>
            </Button>

            {expandedSections.itinerary && (
              <div className="ml-7 mt-2 mb-4 space-y-4">
                {itineraryDates.map((item, index) => (
                  <Button
                    key={item.date}
                    type="text"
                    size="small"
                    className={`w-full justify-start text-sm ${
                      activeSection === `itinerary-day-${index}`
                        ? "text-black font-bold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => scrollToSection(`itinerary-day-${index}`)}
                  >
                    {item.date}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Budget */}
          <div className="mt-3">
            <Button
              type="text"
              className={`w-full h-12 px-2 font-bold text-lg justify-start ${
                activeSection === "budgeting" ? "!bg-gray-900 !text-white" : "text-gray-700 hover:text-gray-600"
              }`}
              onClick={() => {
                scrollToSection("budgeting")
              }}
            >
              <Button
                className="p-0 m-0 !text-inherit !bg-transparent shadow-none border-none"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleSection("budget")
                }}
              >
                {expandedSections.budget ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
              <span className="font-semibold">Budget</span>
            </Button>

            {expandedSections.budget && (
              <div className="ml-6 space-y-1">
                <Button
                  type="text"
                  size="small"
                  className={`w-full justify-start text-sm ${
                    activeSection === "budgeting" ? "text-black font-bold" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => scrollToSection("budgeting")}
                >
                  View
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
