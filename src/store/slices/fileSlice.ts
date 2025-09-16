import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { SLICE_KEYS } from "../storage/config";
import { parseCSV } from "@/utils";
import { ITransaction, addTransactions } from "./transactionsSlice";

export interface IFileUploadProgress {
  name: string;
  progress: number;
  status: "uploading" | "completed" | "error";
}

export interface IFileState {
  files: IFileUploadProgress[];
  loading: boolean;
  error: string | null;
}

const initialState: IFileState = {
  files: [],
  loading: false,
  error: null,
};

export const filesSlice = createSlice({
  name: SLICE_KEYS.FILES,
  initialState,
  reducers: {
    startedUplaodingFiles: (state) => {
      state.loading = true;
      state.error = null;
    },
    errorUplaodingFiles: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFileProgress: (
      state,
      action: PayloadAction<{
        fileName: File["name"];
        progress: IFileUploadProgress["progress"];
        status: IFileUploadProgress["status"];
      }>
    ) => {
      const { fileName, progress, status } = action.payload;
      const fileProgress = state.files.map((f) => {
        if (f.name !== fileName) {
          return f;
        }

        return {
          name: f.name,
          progress,
          status,
        };
      });

      state.files = fileProgress;
      state.loading = false;
      state.error = "";
    },
    setFileProgresses(state, action: PayloadAction<IFileUploadProgress[]>) {
      state.files = action.payload;
    },
  },
});

export const {
  startedUplaodingFiles,
  errorUplaodingFiles,
  setFileProgresses,
  setFileProgress,
} = filesSlice.actions;

export const processFiles = createAsyncThunk(
  `${SLICE_KEYS.FILES}/processFiles`,
  async (files: File[], { dispatch }): Promise<void> => {
    const csvFiles = files.filter((file) => file.type === "text/csv");

    if (csvFiles.length === 0) {
      dispatch(errorUplaodingFiles("No CSV files uploaded"));
      return;
    }

    dispatch(startedUplaodingFiles());

    const initialProgresses: IFileUploadProgress[] = files.map((file) => ({
      name: file.name,
      progress: 0,
      status: "uploading" as const,
    }));
    dispatch(setFileProgresses(initialProgresses));

    const allData: ITransaction[] = [];

    for (const file of files) {
      try {
        const data = await Promise.resolve(parseCSV(file));

        dispatch(
          setFileProgress({
            fileName: file.name,
            progress: 50,
            status: "uploading",
          })
        );
        allData.push(...data);
        dispatch(
          setFileProgress({
            fileName: file.name,
            progress: 100,
            status: "completed",
          })
        );
      } catch {
        dispatch(
          setFileProgress({ fileName: file.name, progress: 0, status: "error" })
        );
      }
    }

    dispatch(addTransactions(allData));
  }
);

export default filesSlice.reducer;
