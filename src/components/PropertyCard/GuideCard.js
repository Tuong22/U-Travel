export default function GuideCard({
  title = "Your Guides",
  message = "You don't have any guides yet....",
  buttonText = "Plan new trips",
  onButtonClick,
  className = "",
  backgroundSrc
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
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">{message}</p>

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
  )
}
