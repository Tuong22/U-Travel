import { Search, Menu, X, User } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import AvatarPopup from "./AvatarPopup"
import MoreMenuPopup from "./MoreMenuPopup"
import logo from '../../assets/image/Logo.svg'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../ProtectedRoute/AuthContext"
import { u } from "framer-motion/client"

export default function Navbar({ onLogoClick }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const avatarRef = useRef(null)
  const popupRef = useRef(null)
  const moreMenuRef = useRef(null)
  const morePopupRef = useRef(null)
  const navigate = useNavigate();
  const { logout } = useAuth()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setIsAvatarPopupOpen(false)
      }
      if (
        morePopupRef.current &&
        !morePopupRef.current.contains(event.target) &&
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target)
      ) {
        setIsMoreMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navItems = [
    { label: "Plan new trips", href: "#" },
    { label: "Explore", href: "#" },
    { label: "Your trip", href: "#" },
    { label: "Guides & Tips", href: "#" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleAvatarPopup = () => {
    setIsAvatarPopupOpen(!isAvatarPopupOpen)
    setIsMoreMenuOpen(false)
  }

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen)
    setIsAvatarPopupOpen(false)
  }

  const handleAvatarMenuItemClick = (action) => {
    if (action === "profile") {
      navigate("/profile");
    }
    if (action === "logout") {
      logout();
      navigate("/");
    }
    setIsAvatarPopupOpen(false)
  }

  const handleMoreMenuItemClick = (action) => {
    console.log("More menu item clicked:", action)
    setIsMoreMenuOpen(false)
  }

  return (
    <nav className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-16 py-4 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <a onClick={onLogoClick} alt="logo" href="#">
            <div className="h-[30px] w-[150px]">
              <img src={logo} alt="logo" className="h-full w-full object-cover" />
            </div>
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-16 font-bold">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-sm text-[#484848] hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative hidden sm:block">
            <div className="flex items-center bg-gray-800 rounded-full px-3 py-1.5 md:px-4 md:py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 text-sm outline-none w-24 md:w-32 lg:w-40"
              />
              <Search className="w-4 h-4 text-gray-400 ml-1 md:ml-2" />
            </div>
          </div>

          <div className="relative hidden md:block">
            <button
              ref={moreMenuRef}
              onClick={toggleMoreMenu}
              className="relative focus:outline-none p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <div className="flex flex-col space-y-1">
                <div className="w-4 h-0.5 bg-gray-600"></div>
                <div className="w-4 h-0.5 bg-gray-600"></div>
                <div className="w-4 h-0.5 bg-gray-600"></div>
              </div>
            </button>

            <MoreMenuPopup ref={morePopupRef} isOpen={isMoreMenuOpen} onMenuItemClick={handleMoreMenuItemClick} />
          </div>

          <div className="relative hidden sm:block">
            <button ref={avatarRef} onClick={toggleAvatarPopup} className="relative focus:outline-none">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>

            <AvatarPopup ref={popupRef} isOpen={isAvatarPopupOpen} onMenuItemClick={handleAvatarMenuItemClick} />
          </div>

          <button className="sm:hidden p-2 text-gray-600">
            <Search className="w-5 h-5" />
          </button>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-16">
          <div className="flex flex-col p-4 space-y-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-lg font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">My Account</p>
                  <p className="text-sm text-gray-500">View profile</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
