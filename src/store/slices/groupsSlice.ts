import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEYS } from "../storage/config";

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
      color: "#ff0000",
    },
    {
      id: "2",
      name: "Transport",
      color: "#00ff00",
    },
    {
      id: "3",
      name: "Petrol",
      color: "#0000ff",
    },
  ],
};

export const groupSlice = createSlice({
  name: SLICE_KEYS.GROUPS,
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<IGroup>) => {
      state.groups.push(action.payload);
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
