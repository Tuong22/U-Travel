import { useState } from "react"
import { X } from "lucide-react"

// TypeScript type aliases removed for JavaScript compatibility
import PropTypes from "prop-types"

const FilterPopup = ({ onClose, onApplyFilters, activeFilters }) => {
  const [selectedTab, setSelectedTab] = useState("category")

  // Available filter options by category
  const filterOptions = {
    category: [
      { id: "hotel", label: "Hotels", type: "category"},
      { id: "restaurant", label: "Restaurants", type: "category"},
      { id: "attraction", label: "Attractions", type: "category"},
      { id: "summer", label: "Summer vacation", type: "category"},
      { id: "winter", label: "Winter getaway", type: "category"},
      { id: "business", label: "Business trip", type: "category"},
    ],
    location: [
      { id: "hanoi", label: "Ha noi", type: "location"},
      { id: "hoankiemdistrict", label: "Hoan Kiem District", type: "location"},
      { id: "oldquarter", label: "Old Quarter", type: "location"},
      { id: "westlake", label: "West Lake", type: "location"},
      { id: "dongda", label: "Dong Da District", type: "location"},
    ],
    duration: [
      { id: "short", label: "Short period", type: "duration"},
      { id: "weekend", label: "Weekend trip", type: "duration"},
      { id: "week", label: "Week-long", type: "duration"},
      { id: "month", label: "Monthly stay", type: "duration"},
    ],
    price: [
      { id: "budget", label: "Budget-friendly", type: "price"},
      { id: "mid", label: "Mid-range", type: "price"},
      { id: "luxury", label: "Luxury", type: "price"},
      { id: "premium", label: "Premium", type: "price"},
    ],
    amenities: [
      { id: "wifi", label: "Free WiFi", type: "amenities"},
      { id: "parking", label: "Parking", type: "amenities"},
      { id: "pool", label: "Swimming Pool", type: "amenities"},
      { id: "petfriendly", label: "Pet Friendly", type: "amenities"},
      { id: "spa", label: "Spa Services", type: "amenities"},
      { id: "gym", label: "Fitness Center", type: "amenities"},
    ],
  }

  // Check if a filter is active
  const isFilterActive = (filterId) => {
    return activeFilters.some((filter) => filter.id === filterId)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={onClose} />

      {/* Popup */}
      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl z-50 w-[380px] border">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex overflow-x-auto p-3 border-b bg-gray-50">
          {Object.keys(filterOptions).map((category) => (
            <button
              key={category}
              className={`px-3 py-2 whitespace-nowrap rounded-full mr-2 text-sm font-medium transition-colors ${
                selectedTab === category ? "bg-gray-800 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border"
              }`}
              onClick={() => setSelectedTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Filter options */}
        <div className="p-4 max-h-[320px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {filterOptions[selectedTab].map((option) => (
              <button
                key={option.id}
                className={`p-3 rounded-lg text-sm text-left transition-colors ${
                  isFilterActive(option.id)
                    ? "bg-gray-800 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-800 border"
                }`}
                onClick={() => onApplyFilters(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <button
            className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

FilterPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
  activeFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        "location",
        "category",
        "duration",
        "price",
        "amenities"
      ]).isRequired
    })
  ).isRequired
}

export default FilterPopup
