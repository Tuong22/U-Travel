"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Mock user data
            const userData = {
                id: "1",
                email,
                firstName: "John",
                lastName: "Doe",
            }

            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
            return true
        } catch (error) {
            return false
        }
    }

    const signup = async (userData) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const newUser = {
                id: Date.now().toString(),
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
            }

            setUser(newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            return true
        } catch (error) {
            return false
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        isLoading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
