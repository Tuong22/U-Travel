import { useState, useRef, useEffect } from "react"
import SearchBar from "../SearchBar/SearchBar"

export default function Tabbar({onClickSearch}) {
  const [activeTab, setActiveTab] = useState("Trip")
  const [isOverflowing, setIsOverflowing] = useState(false)
  const tabsContainerRef = useRef(null)

  const tabs = [
    { id: "Trip", label: "Trip" },
    { id: "Review", label: "Review" },
    { id: "Guide", label: "Guide" },
    { id: "Event", label: "Event" },
  ]

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsContainerRef.current) {
        const { scrollWidth, clientWidth } = tabsContainerRef.current
        setIsOverflowing(scrollWidth > clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)

    return () => {
      window.removeEventListener("resize", checkOverflow)
    }
  }, [])

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6">
        <div className="mb-4 sm:mb-0 sm:mr-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">FIND</h1>
        </div>
        <div className={`w-full overflow-x-auto ${isOverflowing ? "pb-2" : ""}`} ref={tabsContainerRef}>
          <nav className="flex space-x-6 sm:space-x-8 md:space-x-16 whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-[5px] px-1 text-base sm:text-lg font-medium transition-colors duration-200 ${activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {activeTab === "Trip" && (
        <div className="w-full max-w-full px-4 sm:px-0 sm:w-[90%] md:w-[820px]">
          <SearchBar onClickSearch={onClickSearch} />
        </div>
      )}

      {activeTab === "Review" && (
        <div className="w-full max-w-full px-4 sm:px-0 sm:w-[90%] md:w-[820px]">
          <div className="text-center py-[29px]">
            <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
            <p className="text-gray-600">Review content will be added here</p>
          </div>
        </div>
      )}

      {activeTab === "Guide" && (
        <div className="w-full max-w-full px-4 sm:px-0 sm:w-[90%] md:w-[820px]">
          <div className="text-center py-[29px]">
            <h2 className="text-2xl font-semibold text-gray-900">Travel Guides</h2>
            <p className="text-gray-600">Guide content will be added here</p>
          </div>
        </div>
      )}

      {activeTab === "Event" && (
        <div className="w-full max-w-full px-4 sm:px-0 sm:w-[90%] md:w-[820px]">
          <div className="text-center py-[29px]">
            <h2 className="text-2xl font-semibold text-gray-900">Events</h2>
            <p className="text-gray-600">Event content will be added here</p>
          </div>
        </div>
      )}
    </div>
  )
}
