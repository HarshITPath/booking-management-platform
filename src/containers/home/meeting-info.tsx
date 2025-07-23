"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { ICONS } from "@/assets/icons";

interface EventDetails {
  id: number;
  title: string;
  message: string;
  duration: number;
  url?: string;
  agent?: {
    id: number;
    name: string;
  };
}

interface SidebarProps {
  event: EventDetails | null;
  showForm?: boolean;
  selectedSlot?: {
    local: string;
    utc: string;
    display: string;
  } | null;
  selectedDate?: moment.Moment | null;
  selectedTimezone?: { id: string; label: string } | null;
}

const MeetingInfo: React.FC<SidebarProps> = ({
  event,
  showForm,
  selectedSlot,
  selectedDate,
  selectedTimezone,
}) => {
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
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          {event?.title}
        </Typography>
        <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
          <ICONS.Person />
          <Typography variant="body1" fontWeight="bold">
            {event?.agent?.name}
          </Typography>
        </Stack>
        {event?.duration && (
          <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
            <ICONS.Time />
            <Typography variant="body2">{event.duration} Minutes</Typography>
          </Stack>
        )}
        {showForm && selectedSlot && selectedDate && selectedTimezone && (
          <Stack spacing={2}>
            <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
              <ICONS.Calendar />
              <Typography variant="body2">
                {selectedDate.format("MMMM D, YYYY")}
              </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
              <ICONS.Alarms />
              <Typography variant="body2">{selectedSlot.display}</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
              <ICONS.Timezone />
              <Typography variant="body2">{selectedTimezone.id}</Typography>
            </Stack>
          </Stack>
        )}
        {event?.message && (
          <Typography variant="body2">{event.message}</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default MeetingInfo;
