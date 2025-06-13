import { Button, Card } from "antd"

export default function BudgetCard({ budget = 0, spent = 0 }) {
  const remaining = budget - spent

  return (
    <Card>
      <h3 className="font-semibold mb-3">Budgeting</h3>
      <div className="text-2xl font-bold">${budget.toFixed(2)}</div>
      <p className="text-sm text-gray-500">
        Spent: ${spent.toFixed(2)} • Remaining: ${remaining.toFixed(2)}
      </p>
      <Button type="link" className="p-0 h-auto text-sm">
        View details
      </Button>
    </Card>
  )
}
