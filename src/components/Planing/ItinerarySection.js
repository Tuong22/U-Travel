"use client"

import { useState } from "react"
import { CalendarDays, ChevronDown, ChevronRight, MapPin, Plus, ImageIcon, ListFilter, Trash2 } from 'lucide-react'
import { Button, Card, Input, Avatar, Dropdown } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"
import Carousel from "../Carousel/Carousel"
import { hanoiProperties } from "../../mock/hanoi"

export default function ItinerarySection({ onAddExpense, onUpdateMap }) {
  const [itineraryDays, setItineraryDays] = useState([
    {
      date: "Fri 6/13",
      day: "Friday, June 13th",
      collapsed: false,
      places: [],
    },
    {
      date: "Sat 6/14",
      day: "Saturday, June 14th",
      collapsed: false,
      places: [],
    },
    {
      date: "Sun 6/15",
      day: "Sunday, June 15th",
      collapsed: true,
      places: [],
    },
    {
      date: "Mon 6/16",
      day: "Monday, June 16th",
      collapsed: true,
      places: [],
    },
  ])

  const [recommendedVisible, setRecommendedVisible] = useState(true)

  const toggleDayCollapse = (index) => {
    setItineraryDays((prevDays) =>
      prevDays.map((day, i) => (i === index ? { ...day, collapsed: !day.collapsed } : day)),
    )
  }

  const addPlace = (dayIndex, place) => {
    setItineraryDays((prevDays) =>
      prevDays.map((day, i) => (i === dayIndex ? { ...day, places: [...day.places, place] } : day)),
    )

    // Add to budget if onAddExpense is provided
    if (onAddExpense && place.priceRange) {
      onAddExpense(place)
    }

    // Update map if onUpdateMap is provided
    if (onUpdateMap) {
      onUpdateMap(place)
    }
  }

  const removePlace = (dayIndex, placeId) => {
    setItineraryDays((prevDays) =>
      prevDays.map((day, i) => (i === dayIndex ? { ...day, places: day.places.filter((p) => p.id !== placeId) } : day)),
    )
  }

  const collapseAllDays = () => {
    setItineraryDays((prevDays) => prevDays.map((day) => ({ ...day, collapsed: true })))
  }

  const deleteDay = (dayIndex) => {
    setItineraryDays((prevDays) => prevDays.filter((_, i) => i !== dayIndex))
  }

  const insertDayAfter = (dayIndex) => {
    const newDay = {
      date: "New Day",
      day: "New Day",
      collapsed: false,
      places: [],
    }
    setItineraryDays((prevDays) => [...prevDays.slice(0, dayIndex + 1), newDay, ...prevDays.slice(dayIndex + 1)])
  }

  // Menu items for the dropdown
  const getMenuItems = (dayIndex) => [
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
      label: "Collapse all days",
      onClick: () => collapseAllDays(),
    },
    {
      key: "insert",
      label: "Insert day after",
      onClick: () => insertDayAfter(dayIndex),
    },
    {
      key: "delete",
      label: "Delete day",
      onClick: () => deleteDay(dayIndex),
    },
  ]

  return (
    <section id="itinerary" className="mb-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Itinerary</h2>
        <Button icon={<CalendarDays className="w-4 h-4 mr-1" />}>6/13 - 6/16</Button>
      </div>

      <div className="space-y-4">
        {itineraryDays.map((day, dayIndex) => (
          <Card
            key={dayIndex}
            id={`itinerary-day-${dayIndex}`}
            className="w-full"
            bodyStyle={{ padding: day.collapsed ? "12px 24px" : "12px 24px 16px" }}
            bordered={false}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  type="text"
                  icon={day.collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  onClick={() => toggleDayCollapse(dayIndex)}
                  size="small"
                  className="flex items-center justify-center p-0 border-0"
                />
                <span className="font-medium">{day.day}</span>
              </div>

              <Dropdown
                menu={{ items: getMenuItems(dayIndex) }}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <Button
                  type="text"
                  icon={<EllipsisOutlined style={{ fontSize: "20px" }} />}
                  className="border-0 flex items-center justify-center"
                />
              </Dropdown>
            </div>

            {!day.collapsed && (
              <>
                <div className="text-xs text-gray-500 ml-7">Add subheading</div>

                <div className="mt-4 space-y-3">
                  {day.places.map((place, placeIndex) => (
                    <Card
                      key={`${dayIndex}-${placeIndex}`}
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
                            removePlace(dayIndex, place.id)
                          }}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          size="small"
                        />
                      </div>
                    </Card>
                  ))}

                  <Card
                    className="w-full"
                    bodyStyle={{ padding: "12px 16px", backgroundColor: "#f6f8f9" }}
                    bordered={false}
                  >
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                      <Input
                        placeholder="Add a place"
                        bordered={false}
                        className="p-0 bg-transparent"
                        suffix={
                          <div className="flex space-x-1">
                            <Button type="text" icon={<ImageIcon className="w-4 h-4" />} size="small" />
                            <Button type="text" icon={<ListFilter className="w-4 h-4" />} size="small" />
                          </div>
                        }
                      />
                    </div>
                  </Card>

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
                          <Card key={place.id} className="w-full" bodyStyle={{ padding: "12px" }} bordered>
                            <div className="flex items-center">
                              <img
                                src={place.images[0] || "/placeholder.svg"}
                                alt={place.title}
                                className="w-12 h-12 rounded-lg object-cover mr-3"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{place.title}</p>
                              </div>
                              <Button
                                type="text"
                                icon={<Plus className="w-4 h-4" />}
                                onClick={() => addPlace(dayIndex, { ...place, id: `day-${dayIndex}-${place.id}` })}
                                size="small"
                              />
                            </div>
                          </Card>
                        ))}
                      </Carousel>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
