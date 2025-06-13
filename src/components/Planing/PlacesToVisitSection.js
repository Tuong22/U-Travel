"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, MapPin, Plus, ImageIcon, ListFilter, Trash2 } from "lucide-react"
import { Button, Input, Dropdown, Card, Avatar } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"
import Carousel from "../Carousel/Carousel"
import { hanoiProperties } from "../../mock/hanoi"

export default function PlacesToVisit({ onAddExpense, onUpdateMap }) {
  const [collapsed, setCollapsed] = useState(false)
  const [recommendedVisible, setRecommendedVisible] = useState(true)
  const [newPlace, setNewPlace] = useState("")

  const [places, setPlaces] = useState([])

  const addPlace = (place) => {
    // Ensure the place has all required properties
    const completePlace = {
      ...place,
      images: place.images || [place.image || "/placeholder.svg?height=160&width=240"],
      title: place.title || "No title provided",
      type: place.type || "Custom",
      address: place.address || "Custom location",
    }
    setPlaces((prevPlaces) => [completePlace, ...prevPlaces])
    setNewPlace("")

    // Add to budget if onAddExpense is provided
    if (onAddExpense && place.priceRange) {
      onAddExpense(place)
    }

    // Update map if onUpdateMap is provided
    if (onUpdateMap) {
      onUpdateMap(place)
    }
  }

  const addNewPlace = () => {
    if (newPlace.trim()) {
      const place = {
        id: `place-${Date.now()}`,
        name: newPlace,
        image: "/placeholder.svg?height=160&width=240",
        description: "Add notes, links, etc. here",
        images: ["/placeholder.svg?height=160&width=240"], // Add this line
        title: "New Place", // Add this line
        type: "Custom", // Add this line
        address: newPlace, // Use the entered text as address for map
      }
      addPlace(place)
    }
  }

  const removePlace = (placeId) => {
    setPlaces((prevPlaces) => prevPlaces.filter((p) => p.id !== placeId))
  }

  // Menu items for the dropdown
  const menuItems = [
    {
      key: "rearrange",
      label: "Rearrange sections",
    },
    {
      key: "color",
      label: "Change color",
    },
    {
      key: "select",
      label: "Select all",
    },
    {
      key: "collapse",
      label: "Collapse all sections",
    },
    {
      key: "delete",
      label: "Delete section",
    },
  ]

  return (
    <section className="mb-8 mx-auto">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 px-0" onClick={() => setCollapsed(!collapsed)}>
          <div className="flex items-center gap-2">
            <Button
              type="text"
              icon={collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              size="small"
              className="flex items-center justify-center p-0 border-0"
            />
            <h2 className="text-2xl font-bold">Places to visit</h2>
          </div>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              icon={<EllipsisOutlined style={{ fontSize: "20px" }} />}
              className="border-0 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>

        {!collapsed && (
          <div className="pb-4">
            <div className="space-y-3 mb-4">
              {places.map((place, placeIndex) => (
                <Card
                  key={place.id}
                  className="relative group"
                  bodyStyle={{ padding: "12px 16px", backgroundColor: "#f6f8f9" }}
                  bordered={false}
                  onClick={() => onUpdateMap && onUpdateMap(place)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar style={{ backgroundColor: "#13c2c2", color: "white", fontWeight: "bold" }} size="large">
                      {placeIndex + 1}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium">{place.name}</h4>
                          <p className="text-sm text-gray-700 font-bold">{place.title || "No title provided"}</p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {place.type} • {place.address}
                          </p>
                        </div>
                        {place.images[0] && (
                          <img
                            src={place.images[0] || "/placeholder.svg"}
                            alt={place.title}
                            className="w-28 h-20 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                    <Button
                      type="text"
                      icon={<Trash2 className="w-4 h-4 text-gray-500" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        removePlace(place.id)
                      }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      size="small"
                    />
                  </div>
                </Card>
              ))}

              <div className="flex items-center bg-[#f6f8f9] p-4 rounded-lg">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <Input
                  placeholder="Add a place"
                  bordered={false}
                  className="p-0 bg-transparent"
                  value={newPlace}
                  onChange={(e) => setNewPlace(e.target.value)}
                  onPressEnter={addNewPlace}
                  suffix={
                    <div className="flex space-x-1">
                      <Button type="text" icon={<ImageIcon className="w-4 h-4" />} size="small" />
                      <Button type="text" icon={<ListFilter className="w-4 h-4" />} size="small" />
                    </div>
                  }
                />
              </div>

              <div className="mt-2">
                <Button
                  type="text"
                  onClick={() => setRecommendedVisible(!recommendedVisible)}
                  className="flex items-center gap-1 text-gray-600 text-sm font-medium p-0"
                >
                  {recommendedVisible ? (
                    <ChevronDown className="w-4 h-4 mr-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-1" />
                  )}
                  Recommended places
                </Button>

                {recommendedVisible && (
                  <Carousel itemsPerView={2}>
                    {hanoiProperties.map((place) => (
                      <div
                        key={place.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center p-3">
                          <img
                            src={place.images[0] || "/placeholder.svg"}
                            alt={place.title}
                            className="w-12 h-12 rounded-lg object-cover mr-3"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{place.name}</p>
                          </div>
                          <Button
                            type="text"
                            icon={<Plus className="w-4 h-4" />}
                            onClick={() =>
                              addPlace({
                                id: `place-${Date.now()}`,
                                name: place.title,
                                image: place.images[0],
                                description: "Add notes, links, etc. here",
                                images: [place.images[0]],
                                title: place.title,
                                type: place.type,
                                address: place.address,
                              })
                            }
                            size="small"
                          />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
