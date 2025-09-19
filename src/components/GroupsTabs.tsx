import React, { useState } from "react";
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { deleteGroup, IGroup } from "@/store/slices/groupsSlice";

const columns: MRT_ColumnDef<IGroup>[] = [
  {
    accessorKey: "name",
    header: "Groups",
    grow: true,
    Cell: ({ row }) => (
      <Chip
        label={row.original.name}
        sx={{
          backgroundColor: row.original.color,
          color: "#fff",
          fontWeight: "medium",
        }}
      />
    ),
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    Cell: ({ row }) => {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const dispatch = useAppDispatch();

      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const onDelete = () => {
        dispatch(deleteGroup(row.original.id));
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
            <MenuItem onClick={onDelete}>
              <ListItemIcon>
                <Delete fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </>
      );
    },
  },
];

export const GroupsTab = () => {
  const { groups = [] } = useAppSelector((state) => state.groups);

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
