"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, PencilLine, BarChart2, Settings, X, Plus, UserPlus } from "lucide-react"
import { Button, Input, Modal, Select } from "antd"

export default function BudgetingSection() {
  const [budget, setBudget] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [expensesCollapsed, setExpensesCollapsed] = useState(false)
  const [budgetModalVisible, setBudgetModalVisible] = useState(false)
  const [newBudget, setNewBudget] = useState("")
  const [sortOption, setSortOption] = useState("date-newest")

  const handleSetBudget = () => {
    if (newBudget && !isNaN(Number.parseFloat(newBudget))) {
      setBudget(Number.parseFloat(newBudget))
      setBudgetModalVisible(false)
    }
  }

  const addExpense = (place) => {
    const price = place.priceRange ? place.priceRange.min : 0
    const newExpense = {
      id: `expense-${Date.now()}`,
      name: place.title,
      amount: price,
      date: new Date().toISOString(),
      category: place.type,
    }
    setExpenses((prev) => [newExpense, ...prev])
    setTotalExpenses((prev) => prev + price)
  }

  const sortOptions = [
    { value: "date-newest", label: "Date (newest first)" },
    { value: "date-oldest", label: "Date (oldest first)" },
    { value: "amount-highest", label: "Amount (highest first)" },
    { value: "amount-lowest", label: "Amount (lowest first)" },
  ]

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

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold">${budget.toFixed(2)}</h2>
            <p className="text-gray-500">
              Spent: ${totalExpenses.toFixed(2)} • Remaining: ${(budget - totalExpenses).toFixed(2)}
            </p>
          </div>
          <div className="space-x-2">
            <Button type="text" icon={<BarChart2 className="w-4 h-4 mr-1" />}>
              View breakdown
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            icon={<PencilLine className="w-4 h-4 mr-1" />}
            className="bg-white"
            onClick={() => setBudgetModalVisible(true)}
          >
            Set budget
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
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setExpensesCollapsed(!expensesCollapsed)}
          >
            {expensesCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            <h2 className="text-xl font-bold">Expenses</h2>
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
            {expenses.length === 0 ? (
              <div className="text-gray-500">You haven't added any expenses yet.</div>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{expense.name}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <div className="font-bold">${expense.amount.toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 mt-12">
        <p>
          Need help or have suggestions? Visit{" "}
          <a href="#" className="text-blue-500">
            help.wanderlog.com
          </a>
        </p>
        <p className="mt-1">
          Or get in touch with the Wanderlog team at{" "}
          <a href="#" className="text-blue-500">
            support@wanderlog.com
          </a>
        </p>
      </div>

      <Modal
        open={budgetModalVisible}
        onCancel={() => setBudgetModalVisible(false)}
        footer={null}
        closeIcon={<X className="w-4 h-4" />}
        title="Set budget"
        centered
      >
        <div className="py-4">
          <div className="border border-purple-200 rounded-lg p-1 bg-purple-50 mb-6">
            <Input
              prefix="$ "
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="0"
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

  return {
    addExpense,
    budget,
    expenses,
    totalExpenses,
  }
}
