import React from "react";
import { Card, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { ITransaction } from "@/store/slices/transactionsSlice";

interface EnhancedSummaryCardsProps {
  transactions: ITransaction[];
  formatCurrency: (amount: number) => string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: 160,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(1),
}));

const EnhancedSummaryCards: React.FC<EnhancedSummaryCardsProps> = ({
  transactions,
  formatCurrency,
}) => {
  const metrics = React.useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let transactionCount = transactions.length;
    let largestExpense = 0;

    transactions.forEach((transaction) => {
      const amount = transaction.amountNumeric || 0;

      if (amount > 0) {
        totalIncome += amount;
      } else {
        const absAmount = Math.abs(amount);
        totalExpenses += absAmount;
        if (absAmount > largestExpense) {
          largestExpense = absAmount;
        }
      }
    });

    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;
    const avgTransactionAmount = transactionCount > 0 ? (totalIncome + totalExpenses) / transactionCount : 0;

    return {
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate,
      transactionCount,
      largestExpense,
      avgTransactionAmount,
    };
  }, [transactions]);

  const cards = [
    {
      title: "Total Income",
      value: formatCurrency(metrics.totalIncome),
      subtitle: `${metrics.transactionCount} transactions`,
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
      color: "#00B894",
      bgColor: "rgba(0, 184, 148, 0.1)",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(metrics.totalExpenses),
      subtitle: `Avg: ${formatCurrency(metrics.avgTransactionAmount)}`,
      icon: <TrendingDownIcon sx={{ fontSize: 24 }} />,
      color: "#E74C3C",
      bgColor: "rgba(231, 76, 60, 0.1)",
    },
    {
      title: "Net Savings",
      value: formatCurrency(metrics.netSavings),
      subtitle: `${metrics.savingsRate.toFixed(1)}% savings rate`,
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 24 }} />,
      color: metrics.netSavings >= 0 ? "#00B894" : "#E74C3C",
      bgColor: metrics.netSavings >= 0 ? "rgba(0, 184, 148, 0.1)" : "rgba(231, 76, 60, 0.1)",
    },
    {
      title: "Largest Expense",
      value: formatCurrency(metrics.largestExpense),
      subtitle: `${metrics.transactionCount} total transactions`,
      icon: <ReceiptIcon sx={{ fontSize: 24 }} />,
      color: "#9B59B6",
      bgColor: "rgba(155, 89, 182, 0.1)",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StyledCard variant="outlined">
            <Box>
              <IconWrapper sx={{ backgroundColor: card.bgColor }}>
                <Box sx={{ color: card.color }}>{card.icon}</Box>
              </IconWrapper>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {card.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: card.color, mb: 1 }}
              >
                {card.value}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {card.subtitle}
            </Typography>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default EnhancedSummaryCards;