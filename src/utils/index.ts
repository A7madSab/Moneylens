import { ITransaction } from "@/store/slices/transactionsSlice";

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
        group: undefined
      } as ITransaction);
    }
  }

  return records;
};
