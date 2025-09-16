import type { StorageConfig } from "./types";

export enum SLICE_KEYS {
  GROUPS = "groups",
  TRANSACTIONS = "transactions",
  RULES = "rules",
  FILES = "files",
}

export const storageConfig: StorageConfig = {
  [SLICE_KEYS.FILES]: "local",
  [SLICE_KEYS.TRANSACTIONS]: "local",
};
