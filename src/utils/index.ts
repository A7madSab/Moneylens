import { ITransaction } from "@/store/slices/transactionsSlice";
import { v4 as uuidv4 } from "uuid";

export const parseCSV = async (file: File): Promise<ITransaction[]> => {
  const csvText = await file.text();

  const lines = csvText.split("\n").filter((line) => line.trim());
  const records: ITransaction[] = [];

  // Skip header row and process data
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split by comma, handling quoted values
    const values = line
      .split(",")
      .map((val) => val.trim().replace(/^"|"$/g, ""));

    if (values[2].toLowerCase().includes("amount")) continue;

    if (values.length >= 2) {
      records.push({
        id: `${file.name}-${i}`,
        date: values[0] || "",
        amount: values[2] || "",
        description: values[1] || "",
        fileName: file.name,
        groupIds: [],
      });
    }
  }

  return records;
};

export const WARM_COLORS = [
  "#FF6B6B",
  "#FF8E53",
  "#FF9F43",
  "#FFC048",
  "#FFD93D",
  "#6BCF7F",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#F8BBD9",
  "#E17055",
  "#FDCB6E",
  "#A29BFE",
  "#74B9FF",
  "#FD79A8",
  "#FDCB6E",
  "#E84393",
  "#00B894",
  "#00CEC9",
  "#FFEAA7",
  "#FAB1A0",
  "#FF7675",
  "#A29BFE",
];

export const getRandomWarmColor = (): string => {
  return WARM_COLORS[Math.floor(Math.random() * WARM_COLORS.length)];
};

export const generateUUID = (): string => {
  return uuidv4();
};
