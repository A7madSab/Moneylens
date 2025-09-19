"use client";
import React, { useState } from "react";
import { Container, Tab, Tabs, Typography } from "@mui/material";
import { UploadFilesTabs } from "@/components/UploadFilesTabs";
import { TransactionTabs } from "@/components/TransactionTabs";
import { useAppSelector } from "@/store";
import { GroupsTab } from "@/components/groups/GroupsTabs";
import AnalyticsTab from "@/components/AnalyticsTab";
import RulesTab from "@/components/rules/RulesTab";

export default function CsvTransactionManager() {
  const [tab, setTab] = useState(0);

  const {
    transactions: { transactions },
    groups: { groups },
    activeRules,
  } = useAppSelector(({ transactions, groups, rules }) => ({
    transactions,
    groups,
    activeRules: rules.rules.filter((rule) => rule.isActive),
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        CSV Transaction Manager
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Upload, queue, and analyze your financial transaction data
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Upload" />
        <Tab
          disabled={transactions.length === 0}
          label={`Transactions (${transactions.length})`}
        />
        <Tab
          disabled={groups.length === 0}
          label={`Groups (${groups.length})`}
        />
        <Tab label="Analytics" />
        <Tab label={`Rules (${activeRules.length})`} />
      </Tabs>

      {tab === 0 && <UploadFilesTabs />}
      {tab === 1 && <TransactionTabs />}
      {tab === 2 && <GroupsTab />}
      {tab === 3 && <AnalyticsTab />}
      {tab === 4 && <RulesTab />}
    </Container>
  );
}
