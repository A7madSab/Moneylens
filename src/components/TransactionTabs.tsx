import React, { useState } from "react";
import {
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { store, useAppSelector } from "@/store";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { ITransaction } from "@/store/slices/transactionsSlice";

const groups = store.getState().groups.groups;

const columns: MRT_ColumnDef<ITransaction>[] = [
  {
    accessorKey: "date",
    header: "date",
    size: 150,
  },
  {
    accessorKey: "amount",
    header: "amount",
    size: 200,
  },
  {
    accessorKey: "description",
    header: "description",
    size: 150,
  },
  {
    accessorKey: "fileName",
    header: "fileName",
    size: 150,
  },
  {
    accessorKey: "group.name",
    header: "group",
    size: 150,
    Cell: ({ row }) => {
      const group = row.original.group;
      return (
        <Chip sx={{ color: group?.color }} label={group?.name || "Ungrouped"} />
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    Cell: () => {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);

      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleAssignGroup = (group: (typeof groups)[0]) => {
        // TODO: Dispatch action to assign group to transaction
        // Example: dispatch(assignGroup({ transactionId: row.original.id, group }))
        handleClose();
      };

      return (
        <>
          <IconButton size="small" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} onClick={() => handleAssignGroup(group)}>
                <ListItemIcon>
                  <Chip
                    size="small"
                    sx={{ backgroundColor: group.color, color: "#fff" }}
                    label=" "
                  />
                </ListItemIcon>
                <ListItemText>{group.name}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    },
  },
];

export const TransactionTabs = () => {
  const { transactions } = useAppSelector((state) => state.transactions);

  const table = useMaterialReactTable({
    columns,
    data: transactions,
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <MaterialReactTable table={table} />
    </Card>
  );
};
