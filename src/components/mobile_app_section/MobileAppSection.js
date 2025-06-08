export function MobileAppSection() {
  return (
    <section className="bg-gray-100 py-16 px-6 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Download Our
              <br />
              Mobile App
            </h2>
            <p className="text-gray-600 mb-8">Available for free on these platforms</p>

            <div className="flex space-x-4">
              <button className="flex items-center space-x-3 bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg transition-colors duration-200">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">PlayStore</span>
              </button>

              <button className="flex items-center space-x-3 bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg transition-colors duration-200">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">AppleStore</span>
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end flex-1">
            <div className="relative">
              <div className="w-32 h-56 bg-gray-400 rounded-3xl flex flex-col items-center justify-between p-4">

                <div className="w-16 h-1 bg-gray-300 rounded-full"></div>

               
                <div className="flex-1 w-full bg-gray-300 rounded-2xl mt-4 mb-4"></div>

              
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
