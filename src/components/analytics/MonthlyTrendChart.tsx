import React from "react";
import { Card, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ITransaction } from "@/store/slices/transactionsSlice";

interface MonthlyTrendChartProps {
  transactions: ITransaction[];
  formatCurrency: (amount: number) => string;
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({
  transactions,
  formatCurrency,
}) => {
  const monthlyData = React.useMemo(() => {
    const monthMap = new Map<string, { income: number; expenses: number }>();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      const amount = transaction.amountNumeric || 0;

      const current = monthMap.get(monthKey) || { income: 0, expenses: 0 };

      if (amount > 0) {
        current.income += amount;
      } else {
        current.expenses += Math.abs(amount);
      }

      monthMap.set(monthKey, current);
    });

    return Array.from(monthMap.entries())
      .map(([month, data]) => ({
        month: new Date(month + "-01").toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        }),
        income: data.income,
        expenses: data.expenses,
        net: data.income - data.expenses,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        height: 500,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Monthly Trend
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Income vs Expenses over time
      </Typography>

      {monthlyData.length > 0 ? (
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              fontSize={12}
              fontWeight={500}
            />
            <Tooltip
              formatter={(value, name) => [formatCurrency(value as number), name]}
              labelStyle={{ fontWeight: 600, fontSize: "14px" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontSize: "14px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#00B894"
              strokeWidth={3}
              dot={{ fill: "#00B894", strokeWidth: 2, r: 4 }}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#E74C3C"
              strokeWidth={3}
              dot={{ fill: "#E74C3C", strokeWidth: 2, r: 4 }}
              name="Expenses"
            />
            <Line
              type="monotone"
              dataKey="net"
              stroke="#3498DB"
              strokeWidth={3}
              dot={{ fill: "#3498DB", strokeWidth: 2, r: 4 }}
              name="Net"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Box sx={{ textAlign: "center", py: 12, color: "text.secondary" }}>
          <Typography variant="h5">No transaction data available</Typography>
        </Box>
      )}
    </Card>
  );
};

export default MonthlyTrendChart;