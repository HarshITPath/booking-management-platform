"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { VideoCall } from "@mui/icons-material";

interface EventDetails {
  id: number;
  title: string;
  message: string;
  duration: number;
  url?: string;
}

interface SidebarProps {
  event: EventDetails | null;
}

const Sidebar: React.FC<SidebarProps> = ({ event }) => {
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
            {event?.title}
          </Typography>

          {event?.duration && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {event.duration} min
            </Typography>
          )}

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <VideoCall sx={{ fontSize: 16, color: "#666" }} />
            <Typography variant="body2" color="text.secondary">
              {event?.url
                ? `Meeting link: ${event.url}`
                : "Web conferencing details provided upon confirmation."}
            </Typography>
          </Stack>
        </Box>

        {event?.message && (
          <Box>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
              {event.message}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Sidebar;
