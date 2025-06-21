"use client"


import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { AuthProvider } from "./components/ProtectedRoute/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Navbar from "./components/Navbar/Navbar"
import { Home } from "./pages/Home"
import Search from "./pages/Search"
import TripPlanningPage from "./pages/TripPlanningPage"
import ProfilePage from "./pages/ProfilePage"
import { Button } from "antd"

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
    <ProtectedRoute>
      <div style={{ minHeight: "100vh"}}>
        <Navbar onLogoClick={handleLogoClick} />
        <Routes>
          <Route path="/" element={<Home onClickSearch={handleSearchClick} onClickPlanning={handlePlanningClick} />} />
          <Route path="/search" element={<Search onClickPlanning={handlePlanningClick} />} />
          <Route path="/planning/:tripId" element={<TripPlanningPage />} />
          <Route path="/planning" element={<TripPlanningPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "calc(100vh - 64px)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#666", marginBottom: "16px" }}>404</h1>
                  <p style={{ color: "#999", marginBottom: "24px" }}>Page not found</p>
                  <Button type="primary" onClick={() => navigate("/")} size="large">
                    Go Home
                  </Button>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </ProtectedRoute>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
