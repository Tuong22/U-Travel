import { Search } from "lucide-react"
import { useState } from "react"
import { DatePicker } from "antd"


export default function SearchBar({ onClickSearch }) {
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState("")

  // Custom styles for the DatePicker to match the design
  const datePickerStyle = {
    input: {
      border: "none",
      boxShadow: "none",
      padding: "0",
      fontSize: "14px",
      color: "#6b7280",
      width: "100%",
      backgroundColor: "transparent",
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-6">
      <div className="bg-white rounded-2xl sm:rounded-full shadow-lg border border-gray-200 p-4 sm:p-2">
        <div className="flex flex-col sm:flex-row sm:items-center">
          {/* Location */}
          <div className="flex-1 mb-4 sm:mb-0 sm:px-4">
            <div className="">
              <label className="block text-sm font-medium text-gray-900 mb-1">Location</label>
              <input
                type="text"
                placeholder="Which city do you prefer?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm text-gray-500 placeholder-gray-400 border-none outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Divider - Only visible on desktop */}
          <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

          {/* Check In */}
          <div className="flex-1 mb-4 sm:mb-0 sm:px-4">
            <label className="block text-sm font-medium text-gray-900 mb-1">Check In</label>
            <DatePicker
              placeholder="Add Dates"
              value={checkIn}
              onChange={(date) => setCheckIn(date)}
              format="YYYY-MM-DD"
              className="w-full border-none"
              popupClassName="ant-picker-calendar"
              styles={datePickerStyle}
            />
          </div>

          <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

          <div className="flex-1 mb-4 sm:mb-0 sm:px-4">
            <label className="block text-sm font-medium text-gray-900 mb-1">Check Out</label>
            <DatePicker
              placeholder="Add Dates"
              value={checkOut}
              onChange={(date) => setCheckOut(date)}
              format="YYYY-MM-DD"
              className="w-full border-none"
              popupClassName="ant-picker-calendar"
              styles={datePickerStyle}
              disabledDate={(current) => {
                // Can't select days before check-in date
                return checkIn ? current && current < checkIn.startOf("day") : false
              }}
            />
          </div>

          <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

          <div className="flex-1 mb-4 sm:mb-0 sm:px-4">
            <label className="block text-sm font-medium text-gray-900 mb-1">Guests</label>
            <input
              type="text"
              placeholder="Add Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full text-sm text-gray-500 placeholder-gray-400 border-none outline-none bg-transparent"
            />
          </div>

          <div className="flex justify-center sm:justify-start">
            <button
              onClick={() =>
                onClickSearch({
                  location,
                  checkIn: checkIn ? checkIn.format("YYYY-MM-DD") : "",
                  checkOut: checkOut ? checkOut.format("YYYY-MM-DD") : "",
                  guests,
                })
              }
              className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
