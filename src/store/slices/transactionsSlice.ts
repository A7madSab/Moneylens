import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_KEYS } from "../storage/config";
import { IGroup } from "./groupsSlice";

export interface ITransaction {
  id: string;
  date: string;
  amount: string;
  description: string;
  fileName: string;
  group: IGroup | null;
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
  },
});

export const { addTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
