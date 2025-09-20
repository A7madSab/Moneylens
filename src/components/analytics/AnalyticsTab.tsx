import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  Paper,
  Stack,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useAppSelector } from "@/store";
import {
  calculateTotalSpending,
  calculateSpendingByGroup,
  getTopCategories,
} from "@/utils";

import TotalSpendingCard from "./TotalSpendingCard";
import SpendingPieChart from "./SpendingPieChart";
import TopCategoriesBarChart from "./TopCategoriesBarChart";
import MonthlyTrendChart from "./MonthlyTrendChart";
import DatePresetsFilter from "./DatePresetsFilter";
import EnhancedSummaryCards from "./EnhancedSummaryCards";
import TransactionFrequencyChart from "./TransactionFrequencyChart";
import TopMerchantsCard from "./TopMerchantsCard";

const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const SummaryCardsContainer = styled(Box)(({ theme }) => ({
  gridColumn: "1 / -1",
  marginBottom: theme.spacing(2),
}));

const MainChartsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: theme.spacing(3),
  gridColumn: "1 / -1",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

const SecondaryChartsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(3),
  gridColumn: "1 / -1",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const FullWidthContainer = styled(Box)({
  gridColumn: "1 / -1",
});

export const AnalyticsTab = () => {
  const { transactions } = useAppSelector((state) => state.transactions);
  const { groups } = useAppSelector((state) => state.groups);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string>("");

  // unique file list
  const uniqueFiles = useMemo(() => {
    const fileSet = new Set(transactions.map((t) => t.fileName));
    return Array.from(fileSet).sort();
  }, [transactions]);

  // filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    if (selectedFiles.length > 0) {
      filtered = filtered.filter((t) => selectedFiles.includes(t.fileName));
    }
    if (startDate || endDate) {
      filtered = filtered.filter((t) => {
        const d = new Date(t.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        if (start && d < start) return false;
        if (end && d > end) return false;
        return true;
      });
    }
    return filtered;
  }, [transactions, selectedFiles, startDate, endDate]);

  // analytics data
  const totalSpending = calculateTotalSpending(filteredTransactions);
  const spendingByGroup = calculateSpendingByGroup(
    filteredTransactions,
    groups
  );
  const topCategories = getTopCategories(spendingByGroup, 5);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Analytics Dashboard
      </Typography>

      {/* Filters */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Filters
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <DatePresetsFilter
            selectedPreset={selectedPreset}
            onPresetChange={(preset) => {
              if (preset) {
                setSelectedPreset(preset.value);
                setStartDate(preset.startDate);
                setEndDate(preset.endDate);
              } else {
                setSelectedPreset("");
                setStartDate("");
                setEndDate("");
              }
            }}
          />

          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Files</InputLabel>
            <Select
              multiple
              value={selectedFiles}
              onChange={(e) => setSelectedFiles(e.target.value as string[])}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {uniqueFiles.map((fileName) => (
                <MenuItem key={fileName} value={fileName}>
                  {fileName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setSelectedPreset(""); // Clear preset when manual date is selected
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 180 }}
          />

          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setSelectedPreset(""); // Clear preset when manual date is selected
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 180 }}
          />
        </Stack>
      </Paper>

      <GridContainer>
        {/* Enhanced Summary Cards */}
        <SummaryCardsContainer>
          <EnhancedSummaryCards
            transactions={filteredTransactions}
            formatCurrency={formatCurrency}
          />
        </SummaryCardsContainer>

        {/* Main Charts - Monthly Trend and Pie Chart */}
        <MainChartsContainer>
          <MonthlyTrendChart
            transactions={filteredTransactions}
            formatCurrency={formatCurrency}
          />
          <SpendingPieChart
            data={spendingByGroup}
            formatCurrency={formatCurrency}
          />
        </MainChartsContainer>

        {/* Secondary Charts - Frequency and Top Merchants */}
        <SecondaryChartsContainer>
          <TransactionFrequencyChart
            transactions={filteredTransactions}
            formatCurrency={formatCurrency}
          />
          <TopMerchantsCard
            transactions={filteredTransactions}
            formatCurrency={formatCurrency}
          />
        </SecondaryChartsContainer>

        {/* Full Width Charts */}
        <FullWidthContainer>
          <TopCategoriesBarChart
            data={topCategories}
            formatCurrency={formatCurrency}
          />
        </FullWidthContainer>
      </GridContainer>
    </Box>
  );
};
