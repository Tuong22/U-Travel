import { UserCircle, Heart, Settings, LogOut, User } from "lucide-react"
import { forwardRef } from "react"

const AvatarPopup = forwardRef(({ isOpen, onMenuItemClick }, ref) => {
  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out"
      style={{
        animation: "slideUp 0.2s ease-out forwards",
      }}
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-sm text-gray-500">john.doe@email.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <button
          onClick={() => onMenuItemClick("profile")}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <UserCircle className="w-4 h-4 mr-3" />
          View Profile
        </button>

        <button
          onClick={() => onMenuItemClick("favorites")}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Heart className="w-4 h-4 mr-3" />
          My Favorites
        </button>

        <button
          onClick={() => onMenuItemClick("settings")}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-1"></div>

      {/* Logout */}
      <button
        onClick={() => onMenuItemClick("logout")}
        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-4 h-4 mr-3" />
        Sign Out
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

AvatarPopup.displayName = "AvatarPopup"

export default AvatarPopup
