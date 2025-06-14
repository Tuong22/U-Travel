import { Card, Progress } from "antd"
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react"

export default function BudgetSummaryCard({ budget = 0, totalExpenses = 0 }) {
  // Ensure we have valid numbers
  const safeBudget = typeof budget === "number" ? budget : 0
  const safeTotalExpenses = typeof totalExpenses === "number" ? totalExpenses : 0

  const remaining = safeBudget - safeTotalExpenses
  const percentage = safeBudget > 0 ? Math.min((safeTotalExpenses / safeBudget) * 100, 100) : 0
  const isOverBudget = safeTotalExpenses > safeBudget && safeBudget > 0

  const getProgressColor = () => {
    if (isOverBudget) return "#ff4d4f"
    if (percentage > 80) return "#faad14"
    return "#52c41a"
  }

  const getStatusIcon = () => {
    if (isOverBudget) return <AlertCircle className="w-5 h-5 text-red-500" />
    if (percentage > 80) return <TrendingUp className="w-5 h-5 text-yellow-500" />
    return <DollarSign className="w-5 h-5 text-green-500" />
  }

  const getStatusText = () => {
    if (safeBudget === 0) return "Set your budget to start tracking expenses"
    if (isOverBudget) return `Over budget by $${Math.abs(remaining).toFixed(2)}`
    if (percentage > 80) return "Approaching budget limit"
    return "Within budget"
  }

  return (
    <Card className="w-full shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="text-lg font-semibold">Trip Budget</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${safeBudget.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total Budget</div>
        </div>
      </div>

      {safeBudget > 0 && (
        <div className="mb-4">
          <Progress
            percent={percentage}
            strokeColor={getProgressColor()}
            trailColor="#f0f0f0"
            strokeWidth={8}
            showInfo={false}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-600">Spent: ${safeTotalExpenses.toFixed(2)}</span>
            <span className={`font-medium ${isOverBudget ? "text-red-500" : "text-green-600"}`}>
              {isOverBudget ? "Over" : "Remaining"}: ${Math.abs(remaining).toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold">${safeTotalExpenses.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Spent</div>
          </div>
          {safeBudget > 0 && (
            <div className="text-center">
              <div className="text-lg font-semibold">{percentage.toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Used</div>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${isOverBudget ? "text-red-500" : "text-gray-600"}`}>
            {getStatusText()}
          </div>
        </div>
      </div>
    </Card>
  )
}
