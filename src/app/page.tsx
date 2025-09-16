"use client";
import React, { useState } from "react";
import { Container, Tab, Tabs, Typography } from "@mui/material";
import { UploadFilesTabs } from "@/components/UploadFilesTabs";
import { TransactionTabs } from "@/components/TransactionTabs";
import { useAppSelector } from "@/store";
import { GroupsTab } from "@/components/GroupsTabs";

export default function CsvTransactionManager() {
  const [tab, setTab] = useState(0);

  const {
    transactions: { transactions },
    groups: { groups },
  } = useAppSelector(({ transactions, groups }) => ({
    transactions,
    groups,
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
        <Tab label="Rules (0)" />
      </Tabs>

      {tab === 0 && <UploadFilesTabs />}
      {tab === 1 && <TransactionTabs />}
      {tab === 2 && <GroupsTab />}
    </Container>
  );
}
