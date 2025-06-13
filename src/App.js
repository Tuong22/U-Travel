"use client"

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import { Home } from "./pages/Home"
import Search from "./pages/Search"
import TripPlanningPage from "./pages/TripPlanningPage"

function AppContent() {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/")
  }

  const handleSearchClick = () => {
    navigate("/search")
  }

  const handlePlanningClick = (tripId) => {
    navigate(`/planning/${tripId || "new"}`)
  }

  return (
    <>
      <Navbar onLogoClick={handleLogoClick} />
      <Routes>
        <Route path="/" element={<Home onClickSearch={handleSearchClick} onClickPlanning={handlePlanningClick} />} />
        <Route path="/search" element={<Search onClickPlanning={handlePlanningClick} />} />
        <Route path="/planning/:tripId" element={<TripPlanningPage />} />
        <Route path="/planning" element={<TripPlanningPage />} />

        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Trang không tồn tại</p>
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
