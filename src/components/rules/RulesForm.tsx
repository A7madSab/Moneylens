import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Card,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useForm } from "@tanstack/react-form";
import { useAppDispatch, useAppSelector } from "@/store";
import { addRule } from "@/store/slices/rulesSlice";

export const RulesForm = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.groups);

  const form = useForm({
    defaultValues: {
      name: "",
      contains: "",
      groupId: "",
    },
    onSubmit: async ({ value }) => {
      dispatch(addRule(value));

      form.reset();
      setShowCreateForm(false);
    },
  });

  const handleCancel = () => {
    form.reset();
    setShowCreateForm(false);
  };

  const handleAddRule = () => {
    setShowCreateForm(true);
  };

  const renderForm = () => {
    if (!showCreateForm)
      return (
        <Button variant="contained" startIcon={<Add />} onClick={handleAddRule}>
          Add Rule
        </Button>
      );

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value || value.trim().length === 0
                  ? "Rule name is required"
                  : undefined,
            }}
          >
            {(field) => (
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Rule Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g., Food Purchases"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors.join(", ")}
                />
              </Box>
            )}
          </form.Field>

          <form.Field
            name="contains"
            validators={{
              onChange: ({ value }) =>
                !value || value.trim().length === 0
                  ? "Description keywords are required"
                  : undefined,
            }}
          >
            {(field) => (
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Description Contains
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g., restaurant, food, cafe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors.join(", ")}
                />
              </Box>
            )}
          </form.Field>

          <form.Field
            name="groupId"
            validators={{
              onChange: ({ value }) =>
                !value || value.trim().length === 0
                  ? "Please select a group"
                  : undefined,
            }}
          >
            {(field) => (
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Assign to Group
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  error={!!field.state.meta.errors.length}
                >
                  <Select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select group
                    </MenuItem>
                    {groups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <FormHelperText>
                      {field.state.meta.errors.join(", ")}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
            )}
          </form.Field>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit}
                sx={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Creating..." : "Create Rule"}
              </Button>
            )}
          </form.Subscribe>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <Card variant="outlined" sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Create New Rule
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Rules automatically assign transactions to groups when their description
        contains specific text
      </Typography>

      {renderForm()}
    </Card>
  );
};
