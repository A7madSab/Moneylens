import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEYS } from "../storage/config";
import { generateUUID } from "@/utils";

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
        "CAIZO, talabat, STACK, CHICKIN WOR, SECOND CU, NOLA, CIRCL, AGHA, Wimp, BAZOOKA, ELABD, Suez Pastry SUE, COASTA, TSEPPAS, CREPE WAFFLE TAGMOA, HOLMES BURGER",
      groupId: "1",
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
  },
});

export const { addRule, deleteRule, updateRule, setRules, toggleRuleActive } =
  rulesSlice.actions;

export default rulesSlice.reducer;
