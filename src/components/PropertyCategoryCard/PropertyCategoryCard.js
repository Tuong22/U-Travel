import {
  Heart,
  Bed,
  Bath,
  Car,
  PawPrint,
  Star,
  Clock,
  MapPin,
  Utensils,
  Camera,
  Ticket,
  Users,
  Wifi,
} from "lucide-react"
import { useState } from "react"

// Define property types and their specific amenities
const getPropertyAmenities = (property) => {
  switch (property.type) {
    case "hotel":
      return [
        { icon: Bed, value: property.amenities.bedrooms, label: "Bedrooms" },
        { icon: Bath, value: property.amenities.bathrooms, label: "Bathrooms" },
        { icon: Car, value: property.amenities.parking, label: "Parking" },
        { icon: PawPrint, value: property.amenities.petsAllowed, label: "Pet Friendly" },
      ]

    case "restaurant":
      return [
        { icon: Star, value: property.amenities.rating, label: "Rating", suffix: "/5" },
        { icon: Utensils, value: property.amenities.cuisine, label: "Cuisine" },
        { icon: Users, value: property.amenities.capacity, label: "Capacity" },
        { icon: Wifi, value: property.amenities.wifi ? "Yes" : "No", label: "WiFi" },
      ]

    case "attraction":
      return [
        { icon: Clock, value: property.amenities.openHours, label: "Hours" },
        { icon: Ticket, value: property.amenities.entryFee, label: "Entry" },
        { icon: Camera, value: property.amenities.photoSpots, label: "Photo Spots" },
        { icon: Users, value: property.amenities.groupSize, label: "Group Size" },
      ]

    default:
      return []
  }
}

const getPriceDisplay = (property) => {
  switch (property.type) {
    case "hotel":
      return `$${property.priceRange.min} - ${property.priceRange.max}/night`
    case "restaurant":
      return `$${property.priceRange.min} - ${property.priceRange.max}/person`
    case "attraction":
      return property.priceRange.min === 0 ? "Free" : `$${property.priceRange.min} - ${property.priceRange.max}/ticket`
    default:
      return `$${property.priceRange.min} - ${property.priceRange.max}`
  }
}

const getTypeColor = (type) => {
  switch (type) {
    case "hotel":
      return "bg-blue-100 text-blue-800"
    case "restaurant":
      return "bg-orange-100 text-orange-800"
    case "attraction":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeLabel = (type) => {
  switch (type) {
    case "hotel":
      return "Hotel"
    case "restaurant":
      return "Restaurant"
    case "attraction":
      return "Attraction"
    default:
      return "Property"
  }
}

export default function PropertyCategoryCard({ property, onClick }) {
  const [isFavorite, setIsFavorite] = useState(property.isFavorite)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const toggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleImageDotClick = (e, index) => {
    e.stopPropagation()
    setCurrentImageIndex(index)
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(property)
    }
  }

  const amenities = getPropertyAmenities(property)
  const priceDisplay = getPriceDisplay(property)
  const typeColor = getTypeColor(property.type)
  const typeLabel = getTypeLabel(property.type)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-100"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={property.images?.[currentImageIndex] || property.image?.[currentImageIndex] || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColor}`}>{typeLabel}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 transition-colors hover:bg-white/20 rounded-full backdrop-blur-sm"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white drop-shadow-sm"}`} />
        </button>

        {/* Price Display */}
        <div className="absolute bottom-3 left-3">
          <span className="text-sm font-medium text-white drop-shadow-sm bg-black/30 px-2 py-1 rounded">
            {priceDisplay}
          </span>
        </div>

        {/* Image Navigation Dots */}
        {(property.images || property.image)?.length > 1 && (
          <div className="absolute bottom-3 right-3 flex space-x-1">
            {(property.images || property.image).map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleImageDotClick(e, index)}
                className={`w-2 h-2 rounded-full transition-opacity ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 truncate pr-2">{property.title}</h3>
          {property.rating && (
            <div className="flex items-center ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 ml-1">{property.rating}</span>
            </div>
          )}
        </div>

        {/* Address/Location */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{property.address || property.location}</span>
        </div>

        {/* Special Info based on type */}
        {property.type === "restaurant" && property.specialInfo && (
          <p className="text-sm text-gray-600 mb-3 italic line-clamp-2">{property.specialInfo}</p>
        )}

        {property.type === "attraction" && property.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
        )}

        {/* Dynamic Amenities */}
        <div className="flex items-center text-gray-600 flex-wrap gap-3">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon
            return (
              <div key={index} className="flex items-center space-x-1">
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {amenity.value}
                  {amenity.suffix || ""}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
