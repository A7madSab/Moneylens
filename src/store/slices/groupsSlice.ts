import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEYS } from "../storage/config";
import { generateUUID, getRandomWarmColor } from "@/utils";

export interface IGroup {
  id: string;
  name: string;
  color: string;
}

const initialState: { groups: IGroup[] } = {
  groups: [
    {
      id: "1",
      name: "Food",
      color: "#FF6B6B",
    },
    {
      id: "2",
      name: "Transport",
      color: "#45B7D1",
    },
    {
      id: "3",
      name: "Petrol",
      color: "#FF8E53",
    },
    {
      id: "4",
      name: "Shopping",
      color: "#6BCF7F",
    },
    {
      id: "5",
      name: "Entertainment",
      color: "#A29BFE",
    },
    {
      id: "6",
      name: "Health",
      color: "#4ECDC4",
    },
    {
      id: "7",
      name: "Utilities",
      color: "#FFD93D",
    },
    {
      id: "8",
      name: "Insurance",
      color: "#E17055",
    },
    {
      id: "9",
      name: "Education",
      color: "#96CEB4",
    },
    {
      id: "10",
      name: "Savings",
      color: "#FDCB6E",
    },
  ],
};

export const groupSlice = createSlice({
  name: SLICE_KEYS.GROUPS,
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<IGroup["name"]>) => {
      state.groups.push({
        id: generateUUID(),
        name: action.payload,
        color: getRandomWarmColor(),
      });
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },
    updateGroup: (state, action: PayloadAction<IGroup>) => {
      const index = state.groups.findIndex(
        (group) => group.id === action.payload.id
      );
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    setGroups: (state, action: PayloadAction<IGroup[]>) => {
      state.groups = action.payload;
    },
  },
});

export const { addGroup, deleteGroup, setGroups, updateGroup } =
  groupSlice.actions;

export default groupSlice.reducer;
