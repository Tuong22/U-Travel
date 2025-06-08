import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import ArcGISJSAPI from "../components/Map/ArcGISJSMap"
import SearchBar from "../components/Hero/SearchBar/SearchBar"
import { SlidersHorizontal, X } from "lucide-react"
import PropertyCategoryCard from "../components/PropertyCategoryCard/PropertyCategoryCard"
import { hanoiProperties } from "../mock/hanoi"
import FilterPopup from "./FilterPopup"
import { motion, AnimatePresence } from "framer-motion"

const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10"
  >
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-blue-600" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 font-medium"
      >
        Đang tìm kiếm...
      </motion.p>
    </div>
  </motion.div>
)

const Search = () => {
  const [filteredProperties, setFilteredProperties] = useState(hanoiProperties)
  const [activeFilters, setActiveFilters] = useState([])
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [selectedPropertyCoordinates, setSelectedPropertyCoordinates] = useState(null)

  const addFilter = (filter) => {
    setActiveFilters((prevFilters) => {
      const isFilterExist = prevFilters.some((f) => f.id === filter.id)
      if (!isFilterExist) {
        return [...prevFilters, filter]
      }
      return prevFilters
    })
  }

  const removeFilter = (id) => {
    setActiveFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== id))
  }

  const toggleFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup)
  }

  const handlePropertyClick = (property) => {
    if (property.coordinates && property.coordinates.length >= 2) {
      setSelectedPropertyCoordinates(property.coordinates)
    }
  }

  useEffect(() => {
    if (activeFilters.length > 0) {
      setIsLoading(true)
    }

    const timeoutId = setTimeout(() => {
      let results = hanoiProperties

      if (activeFilters.length > 0) {
        const locationFilters = activeFilters.filter((f) => f.type === "location")
        if (locationFilters.length > 0) {
          results = results.filter((property) =>
            locationFilters.some(
              (filter) =>
                property.address.toLowerCase().includes(filter.label.toLowerCase()) ||
                property.title.toLowerCase().includes(filter.label.toLowerCase()),
            ),
          )
        }

        const categoryFilters = activeFilters.filter((f) => f.type === "category")
        if (categoryFilters.length > 0) {
          results = results.filter((property) => {
            return categoryFilters.some((filter) => {
              if (filter.label === "Hotels") return property.type === "hotel"
              if (filter.label === "Restaurants") return property.type === "restaurant"
              if (filter.label === "Attractions") return property.type === "attraction"
              return true
            })
          })
        }

        const priceFilters = activeFilters.filter((f) => f.type === "price")
        if (priceFilters.length > 0) {
          results = results.filter((property) => {
            return priceFilters.some((filter) => {
              const maxPrice = property.priceRange.max
              if (filter.label === "Budget-friendly") return maxPrice <= 50
              if (filter.label === "Mid-range") return maxPrice > 50 && maxPrice <= 150
              if (filter.label === "Luxury") return maxPrice > 150 && maxPrice <= 300
              if (filter.label === "Premium") return maxPrice > 300
              return true
            })
          })
        }

        const amenityFilters = activeFilters.filter((f) => f.type === "amenities")
        if (amenityFilters.length > 0) {
          results = results.filter((property) => {
            return amenityFilters.some((filter) => {
              if (filter.label === "Free WiFi") return property.amenities.wifi === true
              if (filter.label === "Parking") return property.amenities.parking && property.amenities.parking !== "No"
              if (filter.label === "Pet Friendly") return property.amenities.petsAllowed === "Yes"
              return true
            })
          })
        }
      }

      setFilteredProperties(results)
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [activeFilters])

  return (
    <>
      <div className="grid grid-cols-10 h-screen">
        <div className="col-span-4 flex justify-center relative">
          <AnimatePresence>{isLoading && <LoadingOverlay />}</AnimatePresence>

          <div>
            <div className="flex items-center justify-between px-5 py-3">
              <SearchBar />
            </div>

            <motion.h3
              key={filteredProperties.length}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xl font-bold leading-tight m-2 px-5`}
            >
              {filteredProperties.length} Kết quả tìm thấy
            </motion.h3>

            <div className="flex items-end justify-between gap-2 px-5">
              <div className="flex-1 overflow-x-auto pb-2 hide-scrollbar w-[100px]">
                <div className="flex space-x-2 w-[100px]">
                  <AnimatePresence>
                    {activeFilters.map((filter) => (
                      <motion.button
                        key={filter.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center py-2 px-[18px] bg-gray-300 rounded-3xl hover:bg-gray-400 transition-colors flex-shrink-0"
                      >
                        <span className="text-sm">{filter.label}</span>
                        <X
                          className="ml-3 cursor-pointer hover:text-red-600"
                          width={20}
                          height={20}
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFilter(filter.id)
                          }}
                        />
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative flex-shrink-0">
                <button
                  className="flex items-center py-3 px-6 border border-gray-400 bg-white rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
                  onClick={toggleFilterPopup}
                >
                  <SlidersHorizontal />
                  <span className="ml-2 font-bold">Bộ lọc</span>
                </button>

                {showFilterPopup && (
                  <FilterPopup
                    onClose={() => setShowFilterPopup(false)}
                    onApplyFilters={addFilter}
                    activeFilters={activeFilters}
                  />
                )}
              </div>
            </div>

            <div className="pt-8 px-5">
              <div className="h-[calc(100vh-100px)] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {filteredProperties.length > 0 ? (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {filteredProperties.map((property, index) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handlePropertyClick(property)}
                          className="cursor-pointer"
                        >
                          <div className="shadow-md">
                            <PropertyCategoryCard property={property} />
                          </div>
                          <div className="h-4" />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10"
                    >
                      <p className="text-gray-500 mb-4">Không tìm thấy kết quả phù hợp với bộ lọc.</p>
                      <button className="text-blue-600 hover:underline" onClick={() => setActiveFilters([])}>
                        Xóa tất cả bộ lọc
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 h-full">
          <ArcGISJSAPI properties={filteredProperties} zoomToCoordinates={selectedPropertyCoordinates} />
        </div>
      </div>
    </>
  )
}

export default Search
