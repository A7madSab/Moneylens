import React, { useState } from "react";
import {
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  ITransaction,
  addGroupToTransaction,
  removeGroupFromTransaction,
} from "@/store/slices/transactionsSlice";

// Helper component to display a group chip
const GroupChip = ({ groupId }: { groupId: string }) => {
  const { groups } = useAppSelector((state) => state.groups);
  const group = groups.find((g) => g.id === groupId);

  if (!group) return <Chip label="Unknown" size="small" color="error" />;

  return (
    <Chip
      label={group.name}
      size="small"
      sx={{
        backgroundColor: group.color,
        color: "white",
        fontWeight: 500,
      }}
    />
  );
};

// Actions component for each transaction row
const TransactionActions = ({ transaction }: { transaction: ITransaction }) => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.groups);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleGroup = (groupId: string) => {
    if (transaction.groupIds.includes(groupId)) {
      dispatch(
        removeGroupFromTransaction({
          transactionId: transaction.id,
          groupId,
        })
      );
    } else {
      dispatch(
        addGroupToTransaction({
          transactionId: transaction.id,
          groupId,
        })
      );
    }
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
        {groups.map((group) => {
          const isAssigned = transaction.groupIds.includes(group.id);
          return (
            <MenuItem
              key={group.id}
              onClick={() => handleToggleGroup(group.id)}
            >
              <ListItemIcon>
                <Chip
                  size="small"
                  sx={{
                    backgroundColor: group.color,
                    color: "#fff",
                    opacity: isAssigned ? 1 : 0.3,
                  }}
                  label={isAssigned ? "✓" : " "}
                />
              </ListItemIcon>
              <ListItemText>
                {group.name} {isAssigned ? "(assigned)" : ""}
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

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
    accessorKey: "groupIds",
    header: "Groups",
    size: 200,
    Cell: ({ row }) => {
      const groupIds = row.original.groupIds || [];
      return (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {groupIds.length === 0 ? (
            <Chip label="Ungrouped" size="small" variant="outlined" />
          ) : (
            groupIds.map((groupId) => (
              <GroupChip key={groupId} groupId={groupId} />
            ))
          )}
        </Box>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    Cell: ({ row }) => {
      return <TransactionActions transaction={row.original} />;
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
