import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SLICE_KEYS } from "../storage/config";
import { generateUUID } from "@/utils";
import { reapplyAllRules } from "./transactionsSlice";
import { IAppStore } from "..";

export interface IRule {
  id: string;
  name: string;
  contains: string;
  groupId: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateRulePayload {
  name: string;
  contains: string;
  groupId: string;
}

const initialState: { rules: IRule[] } = {
  rules: [
    {
      id: "Petrol",
      name: "Petrol",
      contains: "CHILLOUT, MOTAHEDA, CHILL OUT, MISR PETROLEUM ",
      groupId: "3",
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "food",
      name: "Food",
      contains:
        "Brioche, Cilantro, CREPE, CAIZO, talabat, STACK, CHICKIN WOR, SECOND CU, NOLA, CIRCL, AGHA, Wimp, BAZOOKA, ELABD, Suez Pastry SUE, COASTA, TSEPPAS, CREPE WAFFLE TAGMOA, HOLMES BURGER",
      groupId: "1",
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "transportation",
      name: "Transportation",
      contains: "Uber",
      groupId: "2",
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "cloth",
      name: "Cloth",
      contains: "Thebasiclook, LC WAIKIKI",
      groupId: "8",
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ],
};

export const rulesSlice = createSlice({
  name: SLICE_KEYS.RULES,
  initialState,
  reducers: {
    addRule: (state, action: PayloadAction<CreateRulePayload>) => {
      const newRule: IRule = {
        ...action.payload,
        id: generateUUID(),
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      state.rules.push(newRule);
    },
    deleteRule: (state, action: PayloadAction<string>) => {
      state.rules = state.rules.filter((rule) => rule.id !== action.payload);
    },
    updateRule: (state, action: PayloadAction<IRule>) => {
      const index = state.rules.findIndex(
        (rule) => rule.id === action.payload.id
      );
      if (index !== -1) {
        state.rules[index] = action.payload;
      }
    },
    setRules: (state, action: PayloadAction<IRule[]>) => {
      state.rules = action.payload;
    },
    toggleRuleActive: (state, action: PayloadAction<string>) => {
      const rule = state.rules.find((rule) => rule.id === action.payload);
      if (rule) {
        rule.isActive = !rule.isActive;
      }
    },
    deleteRulesByGroupId: (state, action: PayloadAction<string>) => {
      // Remove all rules that are associated with the specified groupId
      state.rules = state.rules.filter(
        (rule) => rule.groupId !== action.payload
      );
    },
  },
  selectors: {
    getActiveRules: (state) => state.rules.filter((rule) => rule.isActive),
  },
});

// Async thunk to add rule and re-apply all rules
export const addRuleWithReapply = createAsyncThunk(
  `${SLICE_KEYS.RULES}/addRuleWithReapply`,
  async (rulePayload: CreateRulePayload, { dispatch, getState }) => {
    // Add the rule
    dispatch(rulesSlice.actions.addRule(rulePayload));

    // Get updated state and re-apply all active rules
    const state = getState() as IAppStore;
    const activeRules = getActiveRules(state);
    dispatch(reapplyAllRules(activeRules));

    return rulePayload;
  }
);

// Async thunk to update rule and re-apply all rules
export const updateRuleWithReapply = createAsyncThunk(
  `${SLICE_KEYS.RULES}/updateRuleWithReapply`,
  async (rule: IRule, { dispatch, getState }) => {
    // Update the rule
    dispatch(rulesSlice.actions.updateRule(rule));

    // Get updated state and re-apply all active rules
    const state = getState() as IAppStore;
    const activeRules = getActiveRules(state);
    dispatch(reapplyAllRules(activeRules));

    return rule;
  }
);

// Async thunk to toggle rule and re-apply all rules
export const toggleRuleActiveWithReapply = createAsyncThunk(
  `${SLICE_KEYS.RULES}/toggleRuleActiveWithReapply`,
  async (ruleId: string, { dispatch, getState }) => {
    // Toggle the rule
    dispatch(rulesSlice.actions.toggleRuleActive(ruleId));

    // Get updated state and re-apply all active rules
    const state = getState() as IAppStore;
    const activeRules = getActiveRules(state);
    dispatch(reapplyAllRules(activeRules));

    return ruleId;
  }
);

export const {
  addRule,
  deleteRule,
  updateRule,
  setRules,
  toggleRuleActive,
  deleteRulesByGroupId,
} = rulesSlice.actions;

export const { getActiveRules } = rulesSlice.selectors;

export default rulesSlice.reducer;
