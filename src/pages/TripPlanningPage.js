"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import TripHeader from "../components/Planing/TripHeader"
import ExploreSection from "../components/Planing/ExploreSection"
import ItinerarySection from "../components/Planing/ItinerarySection"
import NotesSection from "../components/Planing/NotesSection"
import PlacesToVisitSection from "../components/Planing/PlacesToVisitSection"
import BudgetingSection from "../components/Planing/BudgetingSection"
import PlaningSidebar from "../components/Planing/PlaningSidebar"
import SimpleGoogleMap from "./GoogleMap"
import { hanoiProperties } from "../mock/hanoi"
import { MapIcon, XCircleIcon } from 'lucide-react'

export default function TripPlanningPage() {
  const { tripId } = useParams()
  const [activeSection, setActiveSection] = useState("overview")
  const [budget, setBudget] = useState(1000)
  const [expenses, setExpenses] = useState([])
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [tripData, setTripData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mapLocation, setMapLocation] = useState("Hanoi,Vietnam")
  const [showMap, setShowMap] = useState(true)

  const sectionRefs = {
    overview: useRef(null),
    explore: useRef(null),
    notes: useRef(null),
    places: useRef(null),
    itinerary: useRef(null),
    budgeting: useRef(null),
  }

  useEffect(() => {
    // Simulate fetching trip data
    const fetchTripData = async () => {
      setLoading(true)
      try {
        // In a real app, you would fetch data from an API based on tripId
        // For now, we'll just simulate a delay and return mock data
        await new Promise((resolve) => setTimeout(resolve, 500))

        setTripData({
          id: tripId || "new",
          title: tripId === "new" ? "New Trip" : "Trip to Hanoi",
          dateRange: "6/13 - 6/16",
          location: "Hanoi,Vietnam",
          // Other trip data would go here
        })

        // Set the map location
        setMapLocation("Hanoi,Vietnam")
      } catch (error) {
        console.error("Error fetching trip data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTripData()
  }, [tripId])

  const addExpense = (place) => {
    const price = place.priceRange ? place.priceRange.min : 0
    const newExpense = {
      id: `expense-${Date.now()}`,
      name: place.title,
      amount: price,
      date: new Date().toISOString(),
      category: place.type,
    }
    setExpenses((prev) => [newExpense, ...prev])
    setTotalExpenses((prev) => prev + price)
  }

  const updateMapLocation = (place) => {
    if (place && place.address) {
      setMapLocation(place.address)
    }
  }

  const scrollToSection = (sectionId) => {
    // Handle day-specific sections
    if (sectionId.startsWith("itinerary-day-")) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setActiveSection(sectionId)
      } else {
        // If specific day not found, scroll to itinerary section
        if (sectionRefs.itinerary.current) {
          sectionRefs.itinerary.current.scrollIntoView({ behavior: "smooth" })
          setActiveSection("itinerary")
        }
      }
      return
    }

    // Handle main sections
    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Check which section is currently in view
      for (const section in sectionRefs) {
        const element = sectionRefs[section].current
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMap = () => {
    setShowMap((prev) => !prev)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PlaningSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollToSection={scrollToSection}
      />

      <div className="flex flex-1 relative">
        <main
          className={`flex-1 p-4 ${showMap ? "max-w-[calc(100%-350px)]" : "max-w-full"} transition-all duration-300`}
        >
          <div className="max-w-4xl mx-auto">
            <div ref={sectionRefs.overview}>
              <TripHeader tripData={tripData} />
            </div>

            <div ref={sectionRefs.explore}>
              <ExploreSection />
            </div>

            <div ref={sectionRefs.notes}>
              <NotesSection budget={budget} spent={totalExpenses} />
            </div>

            <div ref={sectionRefs.places}>
              <PlacesToVisitSection onAddExpense={addExpense} onUpdateMap={updateMapLocation} />
            </div>

            <div ref={sectionRefs.itinerary}>
              <ItinerarySection onAddExpense={addExpense} onUpdateMap={updateMapLocation} />
            </div>

            <div ref={sectionRefs.budgeting}>
              <BudgetingSection />
            </div>
          </div>
        </main>

        {/* Map Toggle Button */}
        <button
          onClick={toggleMap}
          className="fixed bottom-6 right-6 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          title={showMap ? "Hide map" : "Show map"}
        >
          {showMap ? <XCircleIcon size={24} /> : <MapIcon size={24} />}
        </button>

        {/* Map Container */}
        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ${
            showMap ? "w-[350px]" : "w-0"
          } overflow-hidden`}
          style={{ marginTop: "64px" }} // Adjust based on your navbar height
        >
          <SimpleGoogleMap location={mapLocation} />
        </div>
      </div>
    </div>
  )
}
