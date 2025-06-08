import { ArrowRight } from "lucide-react"

export default function CityCard({ id, name, country, image, avatar, onClick }) {
  return (
    <div
      className="relative bg-gray-100 rounded-xl overflow-hidden w-full h-64 sm:h-72 md:h-80 cursor-pointer transition-shadow group hover:shadow-lg"
      onClick={() => onClick?.(id)}
    >
      <div className="absolute inset-0">
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          className="w-full h-full object-cover  duration-300 hover:scale-105"
        />
      </div>

      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
        <div className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-600 rounded-full flex items-center justify-center shadow-sm">
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
        </div>
      </div>

      <div className="absolute bottom-12 sm:bottom-16 left-3 sm:left-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-300">
          {avatar ? (
            <img src={avatar || "/placeholder.svg"} alt={`${name} avatar`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs font-medium">{name.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-800">{name}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{country}</p>
      </div>
    </div>
  )
}
