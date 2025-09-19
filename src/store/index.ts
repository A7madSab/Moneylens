import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { createPersistenceMiddleware } from "./middleware/persistenceMiddleware";

import { loadPersistedState } from "./storage/stateLoader";
import { SLICE_KEYS } from "./storage/config";

import groupSlice from "./slices/groupsSlice";
import filesSlice from "./slices/fileSlice";
import transactionSlice from "./slices/transactionsSlice";
import rulesSlice from "./slices/rulesSlice";
import { logger } from "./middleware/loggerMiddleware";

const persistedState = loadPersistedState();

const rootReducer = combineReducers({
  [SLICE_KEYS.FILES]: filesSlice,
  [SLICE_KEYS.GROUPS]: groupSlice,
  [SLICE_KEYS.TRANSACTIONS]: transactionSlice,
  [SLICE_KEYS.RULES]: rulesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createPersistenceMiddleware(), logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<Store<RootState>>();
