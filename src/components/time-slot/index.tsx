// "use client";
// import React from "react";
// import { Box, Typography, Stack, Button } from "@mui/material";
// import { FiberManualRecord } from "@mui/icons-material";
// import { Moment } from "moment";

// interface TimeSlot {
//   time: string;
//   available: boolean;
// }

// interface TimeSlotSelectorProps {
//   selectedDate: Moment | null;
//   show: boolean;
// }

// const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
//   selectedDate,
//   show,
// }) => {
//   const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);

//   if (!show || !selectedDate) {
//     return null;
//   }

//   const timeSlots: TimeSlot[] = [
//     { time: "12:00am", available: true },
//     { time: "12:30am", available: true },
//     { time: "1:00am", available: true },
//     { time: "1:30am", available: true },
//     { time: "2:00am", available: true },
//     { time: "2:30am", available: true },
//     { time: "3:00am", available: true },
//   ];

//   const handleSlotSelect = (time: string) => {
//     setSelectedSlot(time);
//   };

//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         p: 3,
//         borderRadius: 2,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         height: "fit-content",
//       }}
//     >
//       <Stack spacing={3}>
//         {/* Header */}
//         <Box>
//           <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
//             Your schedule from
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
//             harship.tipath@gmail.com
//           </Typography>
//           <Typography variant="h6" fontWeight="bold" sx={{ color: "#1a202c" }}>
//             Saturday, July 19
//           </Typography>
//         </Box>

//         {/* Availability Indicator */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FiberManualRecord sx={{ fontSize: 12, color: "#4caf50" }} />
//           <Typography variant="body2" sx={{ color: "#666" }}>
//             times you are available
//           </Typography>
//         </Box>

//         {/* Time Slots */}
//         <Stack spacing={1}>
//           {timeSlots.map((slot) => (
//             <Button
//               key={slot.time}
//               variant={selectedSlot === slot.time ? "contained" : "outlined"}
//               onClick={() => handleSlotSelect(slot.time)}
//               sx={{
//                 justifyContent: "flex-start",
//                 py: 1.5,
//                 px: 2,
//                 borderRadius: 1,
//                 textTransform: "none",
//                 fontWeight: 500,
//                 fontSize: "0.875rem",
//                 border:
//                   selectedSlot === slot.time ? "none" : "1px solid #e0e0e0",
//                 bgcolor: selectedSlot === slot.time ? "#1976d2" : "transparent",
//                 color: selectedSlot === slot.time ? "white" : "#1a202c",
//                 "&:hover": {
//                   bgcolor: selectedSlot === slot.time ? "#1565c0" : "#f5f5f5",
//                   border:
//                     selectedSlot === slot.time ? "none" : "1px solid #1976d2",
//                 },
//                 "&::before": {
//                   content: '""',
//                   width: 8,
//                   height: 8,
//                   borderRadius: "50%",
//                   backgroundColor: "#4caf50",
//                   marginRight: 1,
//                   display: "inline-block",
//                 },
//               }}
//             >
//               {slot.time}
//             </Button>
//           ))}
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default TimeSlotSelector;


"use client";
import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import { Moment } from "moment";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotSelectorProps {
  selectedDate: Moment | null;
  show: boolean;
  onTimeSelect: (time: string) => void;
  selectedTime: string | null;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  show,
  onTimeSelect,
  selectedTime,
}) => {
  if (!show || !selectedDate) {
    return null;
  }

  const timeSlots: TimeSlot[] = [
    { time: "12:00am", available: true },
    { time: "12:30am", available: true },
    { time: "1:00am", available: true },
    { time: "1:30am", available: true },
    { time: "2:00am", available: true },
    { time: "2:30am", available: true },
    { time: "3:00am", available: true },
  ];

  const handleSlotSelect = (time: string) => {
    onTimeSelect(time);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "fit-content",
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
            Your schedule from
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
            harship.tipath@gmail.com
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1a202c" }}>
            {selectedDate.format("dddd, MMMM D")}
          </Typography>
        </Box>

        {/* Availability Indicator */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FiberManualRecord sx={{ fontSize: 12, color: "#4caf50" }} />
          <Typography variant="body2" sx={{ color: "#666" }}>
            times you are available
          </Typography>
        </Box>

        {/* Time Slots */}
        <Stack spacing={1}>
          {timeSlots.map((slot) => (
            <Button
              key={slot.time}
              variant={selectedTime === slot.time ? "contained" : "outlined"}
              onClick={() => handleSlotSelect(slot.time)}
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                px: 2,
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                border:
                  selectedTime === slot.time ? "none" : "1px solid #e0e0e0",
                bgcolor: selectedTime === slot.time ? "#1976d2" : "transparent",
                color: selectedTime === slot.time ? "white" : "#1a202c",
                "&:hover": {
                  bgcolor: selectedTime === slot.time ? "#1565c0" : "#f5f5f5",
                  border:
                    selectedTime === slot.time ? "none" : "1px solid #1976d2",
                },
                "&::before": {
                  content: '""',
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                  marginRight: 1,
                  display: "inline-block",
                },
              }}
            >
              {slot.time}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default TimeSlotSelector;