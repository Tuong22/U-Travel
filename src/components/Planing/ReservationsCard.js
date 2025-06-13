import { Plane, Hotel, Car, Utensils, Paperclip, MoreHorizontal } from "lucide-react"
import { Card, Badge } from "antd"

export default function ReservationsCard() {
  return (
    <Card>
      <h3 className="font-semibold mb-3">Reservations and attachments</h3>
      <div className="flex justify-around">
        <div className="text-center">
          <Plane className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <span className="text-xs text-gray-500">Flight</span>
        </div>
        <div className="text-center">
          <Hotel className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <span className="text-xs text-gray-500">Lodging</span>
        </div>
        <div className="text-center">
          <Car className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <span className="text-xs text-gray-500">Rental car</span>
        </div>
        <div className="text-center">
          <Utensils className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <span className="text-xs text-gray-500">Restaurant</span>
        </div>
        <div className="text-center relative">
          <Paperclip className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <span className="text-xs text-gray-500">Attachment</span>
          <Badge count={1} size="small" className="absolute -top-1 -right-1" />
        </div>
        <div className="text-center">
          <MoreHorizontal className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <span className="text-xs text-gray-500">Other</span>
        </div>
      </div>
    </Card>
  )
}
