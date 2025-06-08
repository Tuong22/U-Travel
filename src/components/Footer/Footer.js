import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer>
      <div className="bg-gray-100 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">LOGO</h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>

              {/* App Download Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg transition-colors duration-200">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">PlayStore</span>
                </button>

                <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg transition-colors duration-200">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">AppleStore</span>
                </button>
              </div>
            </div>

            {/* Company Links */}
            <div className="mt-8 sm:mt-0">
              <h3 className="text-gray-900 font-semibold mb-4">COMPANY</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    Legal Information
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Center Links */}
            <div className="mt-8 sm:mt-0">
              <h3 className="text-gray-900 font-semibold mb-4">HELP CENTER</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    Find a Property
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    How To Host?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    Why Us?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                    Rental Guides
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-0">
              <h3 className="text-gray-900 font-semibold mb-4">CONTACT INFO</h3>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">Phone: 1234567890</p>
                <p className="text-gray-600 text-sm">Email: company@email.com</p>
                <p className="text-gray-600 text-sm">Location: 100 Smart Street, LA, USA</p>

                {/* Social Media Icons */}
                <div className="flex space-x-3 pt-2">
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
        </div>
      </div>
      <div className="border-t border-gray-200">
      </div>
      <div className="bg-gray-100 py-8 px-16 sm:px-6">
        <p className="text-gray-500 text-sm text-center sm:text-left ml-16">
          © 2022 thecreation.design | All rights reserved
        </p>
      </div>
    </footer>
  )
}
