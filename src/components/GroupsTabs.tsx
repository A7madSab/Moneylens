import React from "react";
import { Card, Chip } from "@mui/material";
import { useAppSelector } from "@/store";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { IGroup } from "@/store/slices/groupsSlice";

const columns: MRT_ColumnDef<IGroup>[] = [
  {
    accessorKey: "id",
    header: "id",
    size: 150,
  },
  {
    accessorKey: "name",
    header: "name",
    size: 150,
  },
];

export const GroupsTab = () => {
  const { groups } = useAppSelector((state) => state.groups);

  const table = useMaterialReactTable({
    columns,
    data: groups,
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <MaterialReactTable table={table} />
    </Card>
  );
};
