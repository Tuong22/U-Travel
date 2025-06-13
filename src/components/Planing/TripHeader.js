import { CalendarDays, UserPlus } from "lucide-react"
import { Button, Avatar } from "antd"

export default function TripHeader({ tripData = { title: "Trip to Hanoi", dateRange: "6/13 - 6/16" } }) {
  return (
    <div id="overview" className="relative mb-16 bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"
          alt="Hanoi street scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Card Overlay */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 mx-4 bg-gray-50">
        <div className="rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{tripData.title}</h1>
              <div className="flex items-center gap-2 mt-4 text-gray-600">
                <CalendarDays className="w-5 h-5" />
                <span>{tripData.dateRange}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar size={40} className="bg-gray-200 flex items-center justify-center">
                D
              </Avatar>
              <Button
                shape="circle"
                size="large"
                className="flex items-center justify-center"
                icon={<UserPlus className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
