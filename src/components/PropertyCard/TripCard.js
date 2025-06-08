export default function TripCard({
  title = "Your Trips",
  location = "Hanoi",
  name = "John Doberman",
  dateRange = "From 16th May - 19th",
  buttonText = "Plan new trips",
  onButtonClick,
  avatarSrc,
  className = "",
  backgroundSrc,
  showAvatar = true,
}) {
  return (
    <div className={`relative bg-gray-100 rounded-lg p-6 overflow-hidden ${className}`}>
      {backgroundSrc && (
        <div className="absolute inset-0">
          <img
            src={backgroundSrc || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="relative z-10">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">{title}</h2>
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center">
              {showAvatar && (
                <div className="mr-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                    {avatarSrc ? (
                      <img src={avatarSrc || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                </div>
              )}
              <div>
                <p className="text-gray-500">{location}</p>
                <p className="text-xl font-medium text-gray-700">{name}</p>
                <p className="text-gray-500">{dateRange}</p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={onButtonClick}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full transition-colors"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
