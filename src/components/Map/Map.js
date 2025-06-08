import { Search } from "lucide-react"
import { useState } from "react"
import imageMap from '../../assets/image/map.jpg';

export default function TravelMap() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="relative w-full h-[500px] bg-gray-100 overflow-hidden">
      <div className="absolute top-10 right-4 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-52 px-4 py-2 pr-10 bg-gray-700 text-white placeholder-gray-300 rounded-full border-none outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-600 rounded-full transition-colors">
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      <div className="w-full h-full">
        <img src={imageMap} alt="Map view with property locations" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
