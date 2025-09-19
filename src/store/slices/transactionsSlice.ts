import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_KEYS } from "../storage/config";
import { IGroup } from "./groupsSlice";
import { applyRules } from "@/utils";
import type { IRule } from "./rulesSlice";

export interface ITransaction {
  id: string;
  date: string;
  amount: string;
  description: string;
  fileName: string;
  groupIds: string[];
}
interface ITransactionState {
  transactions: ITransaction[];
  loading: boolean;
  error: string | null;
}
const initialState: ITransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionSlice = createSlice({
  name: SLICE_KEYS.TRANSACTIONS,
  initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.transactions = action.payload;
      state.error = null;
      state.loading = false;
    },
    addGroupToTransaction: (
      state,
      action: PayloadAction<{ transactionId: string; groupId: string }>
    ) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload.transactionId
      );
      if (transaction && !transaction.groupIds.includes(action.payload.groupId)) {
        transaction.groupIds.push(action.payload.groupId);
      }
    },
    removeGroupFromTransaction: (
      state,
      action: PayloadAction<{ transactionId: string; groupId: string }>
    ) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload.transactionId
      );
      if (transaction) {
        transaction.groupIds = transaction.groupIds.filter(
          (id) => id !== action.payload.groupId
        );
      }
    },
    setTransactionGroups: (
      state,
      action: PayloadAction<{ transactionId: string; groupIds: string[] }>
    ) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload.transactionId
      );
      if (transaction) {
        transaction.groupIds = action.payload.groupIds;
      }
    },
    reapplyAllRules: (state, action: PayloadAction<IRule[]>) => {
      // Reset all group assignments and re-apply rules
      const transactionsWithResetGroups = state.transactions.map(transaction => ({
        ...transaction,
        groupIds: []
      }));

      // Apply all active rules to all transactions
      const updatedTransactions = applyRules(transactionsWithResetGroups, action.payload);
      state.transactions = updatedTransactions;
    },
  },
});

export const {
  addTransactions,
  addGroupToTransaction,
  removeGroupFromTransaction,
  setTransactionGroups,
  reapplyAllRules
} = transactionSlice.actions;

export default transactionSlice.reducer;
