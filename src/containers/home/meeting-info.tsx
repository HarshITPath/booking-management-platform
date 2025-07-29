// "use client";
// import React from "react";
// import { Box, Typography, Stack } from "@mui/material";
// import { ICONS } from "@/assets/icons";

// interface EventDetails {
//   id: number;
//   title: string;
//   message: string;
//   duration: number;
//   url?: string;
//   agent?: {
//     id: number;
//     name: string;
//   };
// }

// interface SidebarProps {
//   event: EventDetails | null;
//   showForm?: boolean;
//   selectedSlot?: {
//     local: string;
//     utc: string;
//     display: string;
//   } | null;
//   selectedDate?: moment.Moment | null;
//   selectedTimezone?: { id: string; label: string } | null;
// }

// const MeetingInfo: React.FC<SidebarProps> = ({
//   event,
//   showForm,
//   selectedSlot,
//   selectedDate,
//   selectedTimezone,
// }) => {
//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         p: 3,
//         borderRadius: 2,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         height: "100%",
//       }}
//     >
//       <Stack spacing={2}>
//         <Typography variant="h6" fontWeight="bold">
//           {event?.title}
//         </Typography>
//         <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
//           <ICONS.Person />
//           <Typography variant="body1" fontWeight="bold">
//             {event?.agent?.name}
//           </Typography>
//         </Stack>
//         {event?.duration && (
//           <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
//             <ICONS.Time />
//             <Typography variant="body2">{event.duration} Minutes</Typography>
//           </Stack>
//         )}
//         {showForm && selectedSlot && selectedDate && selectedTimezone && (
//           <Stack spacing={2}>
//             <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
//               <ICONS.Calendar />
//               <Typography variant="body2">
//                 {selectedDate.format("MMMM D, YYYY")}
//               </Typography>
//             </Stack>
//             <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
//               <ICONS.Alarms />
//               <Typography variant="body2">{selectedSlot.display}</Typography>
//             </Stack>
//             <Stack direction={"row"} sx={{ gap: 1, alignItems: "center" }}>
//               <ICONS.Timezone />
//               <Typography variant="body2">{selectedTimezone.id}</Typography>
//             </Stack>
//           </Stack>
//         )}
//         {event?.message && (
//           <Typography variant="body2">{event.message}</Typography>
//         )}
//       </Stack>
//     </Box>
//   );
// };

// export default MeetingInfo;

"use client";
import React from "react";
import { Box, Typography, Stack, Chip, Divider, alpha } from "@mui/material";
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
  eventDetails: EventDetails | null;
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
  eventDetails,
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
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.04)",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
        },
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              color: "#1e293b",
              mb: 1,
            }}
          >
            {eventDetails?.title}
          </Typography>
          <Chip
            label="Meeting Details"
            size="small"
            sx={{
              bgcolor: alpha("#3b82f6", 0.1),
              color: "#3b82f6",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 24,
            }}
          />
        </Box>

        <Stack spacing={2.5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              bgcolor: alpha("#f8fafc", 0.8),
              borderRadius: 2,
              border: "1px solid rgba(226, 232, 240, 0.5)",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}
            >
              <ICONS.Person sx={{ color: "white", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                HOST
              </Typography>
              <Typography
                variant="body1"
                fontWeight="600"
                sx={{ color: "#1e293b" }}
              >
                {eventDetails?.agent?.name}
              </Typography>
            </Box>
          </Box>

          {/* Duration */}
          {eventDetails?.duration && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                bgcolor: alpha("#10b981", 0.05),
                borderRadius: 2,
                border: "1px solid rgba(16, 185, 129, 0.1)",
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  bgcolor: alpha("#10b981", 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ICONS.Time sx={{ color: "#10b981", fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  DURATION
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{ color: "#1e293b" }}
                >
                  {eventDetails?.duration} Minutes
                </Typography>
              </Box>
            </Box>
          )}
        </Stack>

        {/* Selected Details - Show only when form is visible */}
        {showForm && selectedSlot && selectedDate && selectedTimezone && (
          <>
            <Divider sx={{ opacity: 0.5 }} />
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                sx={{
                  color: "#64748b",
                  mb: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Selected Schedule
              </Typography>
              <Stack spacing={2}>
                {/* Date */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ICONS.Calendar sx={{ color: "#6366f1", fontSize: 18 }} />
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ color: "#374151" }}
                  >
                    {selectedDate.format("MMMM D, YYYY")}
                  </Typography>
                </Box>

                {/* Time */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ICONS.Alarms sx={{ color: "#8b5cf6", fontSize: 18 }} />
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ color: "#374151" }}
                  >
                    {selectedSlot.display}
                  </Typography>
                </Box>

                {/* Timezone */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ICONS.Timezone sx={{ color: "#06b6d4", fontSize: 18 }} />
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    sx={{ color: "#374151" }}
                  >
                    {selectedTimezone.id}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </>
        )}

        {/* Meeting Description */}
        {eventDetails?.message && (
          <>
            <Divider sx={{ opacity: 0.5 }} />
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                sx={{
                  color: "#64748b",
                  mb: 1.5,
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                }}
              >
                About This Meeting
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {eventDetails?.message}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MeetingInfo;
