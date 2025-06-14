"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, PencilLine, BarChart2, Settings, X, Plus, UserPlus } from "lucide-react"
import { Button, Input, Modal, Select, Card, Progress } from "antd"

export default function BudgetingSection({ budget = 0, setBudget, expenses = [], totalExpenses = 0 }) {
  const [expensesCollapsed, setExpensesCollapsed] = useState(false)
  const [budgetModalVisible, setBudgetModalVisible] = useState(false)
  const [newBudget, setNewBudget] = useState("")
  const [sortOption, setSortOption] = useState("date-newest")

  // Ensure we have valid numbers
  const safeBudget = typeof budget === "number" ? budget : 0
  const safeTotalExpenses = typeof totalExpenses === "number" ? totalExpenses : 0
  const safeExpenses = Array.isArray(expenses) ? expenses : []

  const remaining = safeBudget - safeTotalExpenses
  const percentage = safeBudget > 0 ? Math.min((safeTotalExpenses / safeBudget) * 100, 100) : 0
  const isOverBudget = safeTotalExpenses > safeBudget && safeBudget > 0

  const handleSetBudget = () => {
    if (newBudget && !isNaN(Number.parseFloat(newBudget))) {
      if (setBudget) {
        setBudget(Number.parseFloat(newBudget))
      }
      setBudgetModalVisible(false)
      setNewBudget("")
    }
  }

  const getProgressColor = () => {
    if (isOverBudget) return "#ff4d4f"
    if (percentage > 80) return "#faad14"
    return "#52c41a"
  }

  const sortOptions = [
    { value: "date-newest", label: "Date (newest first)" },
    { value: "date-oldest", label: "Date (oldest first)" },
    { value: "amount-highest", label: "Amount (highest first)" },
    { value: "amount-lowest", label: "Amount (lowest first)" },
  ]

  const sortedExpenses = [...safeExpenses].sort((a, b) => {
    switch (sortOption) {
      case "date-oldest":
        return new Date(a.date) - new Date(b.date)
      case "amount-highest":
        return b.amount - a.amount
      case "amount-lowest":
        return a.amount - b.amount
      default: // date-newest
        return new Date(b.date) - new Date(a.date)
    }
  })

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Budgeting</h1>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          className="bg-red-500 hover:bg-red-600 border-red-500 rounded-full px-4"
        >
          Add expense
        </Button>
      </div>

      {/* Enhanced Budget Display */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold">${safeBudget.toFixed(2)}</h2>
            <p className="text-gray-500">
              Spent: ${safeTotalExpenses.toFixed(2)} • {isOverBudget ? "Over" : "Remaining"}: $
              {Math.abs(remaining).toFixed(2)}
            </p>
          </div>
          <div className="space-x-2">
            <Button type="text" icon={<BarChart2 className="w-4 h-4 mr-1" />}>
              View breakdown
            </Button>
          </div>
        </div>

        {/* Progress Bar - Only show when budget is set */}
        {safeBudget > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Budget Progress</span>
              <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
            </div>
            <Progress
              percent={percentage}
              strokeColor={getProgressColor()}
              trailColor="#f0f0f0"
              strokeWidth={10}
              showInfo={false}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>$0</span>
              <span>${safeBudget.toFixed(2)}</span>
            </div>
            {isOverBudget && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm font-medium">
                  ⚠️ You are over budget by ${Math.abs(remaining).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            icon={<PencilLine className="w-4 h-4 mr-1" />}
            className="bg-white"
            onClick={() => setBudgetModalVisible(true)}
          >
            {safeBudget > 0 ? "Update budget" : "Set budget"}
          </Button>
          <Button icon={<BarChart2 className="w-4 h-4 mr-1" />} className="bg-white">
            Group balances
          </Button>
          <Button icon={<UserPlus className="w-4 h-4 mr-1" />} className="bg-white">
            Add tripmate
          </Button>
          <Button icon={<Settings className="w-4 h-4 mr-1" />} className="bg-white">
            Settings
          </Button>
        </div>
      </Card>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setExpensesCollapsed(!expensesCollapsed)}
          >
            {expensesCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            <h2 className="text-xl font-bold">Expenses ({safeExpenses.length})</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort:</span>
            <Select
              value={sortOption}
              onChange={(value) => setSortOption(value)}
              options={sortOptions}
              style={{ width: 180 }}
              bordered={false}
              suffixIcon={<ChevronDown className="w-4 h-4" />}
            />
          </div>
        </div>

        {!expensesCollapsed && (
          <div className="space-y-3 py-4">
            {sortedExpenses.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">You haven't added any expenses yet.</div>
                <div className="text-sm text-gray-400">
                  Add places to your itinerary to automatically track expenses
                </div>
              </div>
            ) : (
              sortedExpenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{expense.name || "Unknown expense"}</p>
                    <p className="text-sm text-gray-500">
                      {expense.category || "Other"} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="font-bold text-lg">${(expense.amount || 0).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 mt-12">
      </div>

      <Modal
        open={budgetModalVisible}
        onCancel={() => setBudgetModalVisible(false)}
        footer={null}
        closeIcon={<X className="w-4 h-4" />}
        title={safeBudget > 0 ? "Update budget" : "Set budget"}
        centered
      >
        <div className="py-4">
          <div className="border border-purple-200 rounded-lg p-1 bg-purple-50 mb-6">
            <Input
              prefix="$ "
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder={safeBudget > 0 ? safeBudget.toString() : "0"}
              size="large"
              bordered={false}
              className="text-lg"
              autoFocus
            />
          </div>
          <Button
            type="primary"
            onClick={handleSetBudget}
            className="w-full bg-red-500 hover:bg-red-600 border-red-500 rounded-full h-12"
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
