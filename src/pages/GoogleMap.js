"use client"

import { useState, useEffect } from "react"

export default function GoogleMapComponent({ places = [] }) {
  const [mapUrl, setMapUrl] = useState("")

  useEffect(() => {
    // Create a Google Maps URL with markers for all places
    if (places.length > 0) {
      // Start with base URL
      let url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
      
      if (places.length === 1 && places[0].coordinates) {
        // If only one place, center on it
        const place = places[0]
        const lat = place.coordinates[1]
        const lng = place.coordinates[0]
        url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=15`
      } else {
        // For multiple places, use the view option
        url = "https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        
        // Center on Hanoi
        url += "&center=21.0285,105.8542&zoom=13"
      }
      
      setMapUrl(url)
    } else {
      // Default to Hanoi center if no places
      setMapUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Hanoi,Vietnam")
    }
  }, [places])

  return (
    <div className="w-full h-full">
      {mapUrl ? (
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  )
}
