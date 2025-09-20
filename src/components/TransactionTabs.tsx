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
  Grid,
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
import { GroupsForm } from "./groups/GroupForm";
import { RulesForm } from "./rules/RulesForm";
import RulesTab from "./rules/RulesTab";
import { GroupsTab } from "./groups/GroupsTabs";

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
    size: 2,
  },
  {
    accessorKey: "amount",
    header: "amount",
    size: 2,
  },
  {
    accessorKey: "description",
    header: "description",
    size: 2,
  },
  {
    accessorKey: "groupIds",
    header: "Groups",
    size: 2,

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
    header: "",
    id: "actions",
    size: 2,
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
    initialState: {
      pagination: { pageSize: 100, pageIndex: 0 },
    },
  });

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <MaterialReactTable table={table} />
      </Grid>
      <Grid container flexDirection="column" size={{ xs: 12, md: 4 }}>
        <GroupsTab />
        <RulesTab />
      </Grid>
    </Grid>
  );
};
