import { HelpCircle, MessageCircle, Settings } from "lucide-react"
import { forwardRef } from "react"

const MoreMenuPopup = forwardRef(({ isOpen, onMenuItemClick }, ref) => {
  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out"
      style={{
        animation: "slideUp 0.2s ease-out forwards",
      }}
    >
      {/* Menu Items */}
      <div className="py-1">
        <button
          onClick={() => onMenuItemClick("help")}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <HelpCircle className="w-4 h-4 mr-3" />
          Help & Support
        </button>

        <button
          onClick={() => onMenuItemClick("feedback")}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-3" />
          Send Feedback
        </button>

        <button
          onClick={() => onMenuItemClick("about")}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 mr-3" />
          About
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-1"></div>

      {/* Additional Options */}
      <button
        onClick={() => onMenuItemClick("terms")}
        className="w-full flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
      >
        Terms & Privacy
      </button>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
})

MoreMenuPopup.displayName = "MoreMenuPopup"

export default MoreMenuPopup
