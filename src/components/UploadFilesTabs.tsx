import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDropzone } from "react-dropzone";
import { processFiles } from "@/store/slices/fileSlice";

export const UploadFilesTabs = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector((state) => state.files);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => dispatch(processFiles(files)),
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    multiple: true,
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload CSV File
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Upload your transaction CSV file to begin processing and analysis
        </Typography>

        <Button variant="contained" sx={{ mb: 3 }}>
          Load Sample Data (August.csv)
        </Button>

        {/* Drag & Drop Box */}
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed",
            borderColor: isDragActive ? "primary.main" : "divider",
            backgroundColor: isDragActive ? "action.hover" : "transparent",
            borderRadius: 2,
            py: 6,
            textAlign: "center",
            color: "text.secondary",
            transition: "border-color 0.2s, background-color 0.2s",
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon
            sx={{
              fontSize: 40,
              mb: 1,
              color: isDragActive ? "primary.main" : "inherit",
            }}
          />
          <Typography>
            {isDragActive
              ? "Drop the files here…"
              : "Drag & drop your CSV files here"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            or click to browse files • Multiple files supported
          </Typography>
        </Box>

        {files.files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Upload Progress:
            </Typography>
            {files.files.map((file) => (
              <Box key={file.name} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {file.name}
                  {file.status === "error" && " - Error"}
                  {file.status === "completed" && " - Completed"}
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "grey.300",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${file.progress}%`,
                        height: "100%",
                        backgroundColor:
                          file.status === "error"
                            ? "error.main"
                            : file.status === "completed"
                            ? "success.main"
                            : "primary.main",
                        transition: "width 0.3s",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block", textAlign: "right" }}
                  >
                    {file.progress}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Expected format */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Expected CSV format:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            <li>
              Column 1: Transaction Date (e.g., &quot;Wed Jul 02 2025&quot;)
            </li>
            <li>Column 2: Description</li>
            <li>Column 3: Amount (e.g., &quot;--40 EGP&quot;)</li>
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
};
