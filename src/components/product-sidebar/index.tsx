"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { VideoCall } from "@mui/icons-material";

const ProductDemoSidebar: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "#1a202c",
              mb: 2,
            }}
          >
            Dittofeed Product Demo
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              30 min
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <VideoCall sx={{ fontSize: 16, color: "#666" }} />
            <Typography variant="body2" color="text.secondary">
              Web conferencing details provided upon confirmation.
            </Typography>
          </Stack>
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            Book a demo with the Dittofeed team.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            In this call, we will show you how Dittofeed works, and explain how
            it differs from platforms like Braze, One Signal, and Customer.io.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDemoSidebar;
