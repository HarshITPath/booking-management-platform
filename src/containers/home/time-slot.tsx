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
//   onTimeSelect: (time: string) => void;
//   selectedTime: string | null;
// }

// const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
//   selectedDate,
//   show,
//   onTimeSelect,
//   selectedTime,
// }) => {
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
//     onTimeSelect(time);
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
//             {selectedDate.format("dddd, MMMM D")}
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
//               variant={selectedTime === slot.time ? "contained" : "outlined"}
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
//                   selectedTime === slot.time ? "none" : "1px solid #e0e0e0",
//                 bgcolor: selectedTime === slot.time ? "#1976d2" : "transparent",
//                 color: selectedTime === slot.time ? "white" : "#1a202c",
//                 "&:hover": {
//                   bgcolor: selectedTime === slot.time ? "#1565c0" : "#f5f5f5",
//                   border:
//                     selectedTime === slot.time ? "none" : "1px solid #1976d2",
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
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  keyframes,
  styled,
} from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import { Moment } from "moment";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotSelectorProps {
  selectedDate: Moment | null;
  show: boolean;
  onNext: (time: string) => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AnimatedNextButton = styled(Button)({
  animation: `${slideIn} 0.2s ease-out forwards`,
});

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  show,
  onNext,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
    { time: "3:30am", available: true },
  ];

  const handleSlotSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNextClick = () => {
    if (selectedTime) {
      onNext(selectedTime);
    }
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
          <Typography variant="h6" fontWeight="bold">
            {selectedDate.format("dddd, MMMM D")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <FiberManualRecord sx={{ fontSize: 12, color: "#4caf50" }} />
            <Typography variant="body2" sx={{ color: "#666" }}>
              times you are available
            </Typography>
          </Box>
        </Box>

        {/* Time Slots */}
        <Stack spacing={1}>
          {timeSlots.map((slot) => (
            <Grid container key={slot.time} alignItems="center" spacing={1}>
              <Grid size={{ xs: selectedTime === slot.time ? 6 : 12 }}>
                <Button
                  fullWidth
                  variant={
                    selectedTime === slot.time ? "contained" : "outlined"
                  }
                  onClick={() => handleSlotSelect(slot.time)}
                  sx={{
                    justifyContent: "flex-start",
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    border:
                      selectedTime === slot.time ? "none" : "1px solid #e0e0e0",
                    bgcolor:
                      selectedTime === slot.time ? "#1976d2" : "transparent",
                    color: selectedTime === slot.time ? "white" : "#1a202c",
                    "&:hover": {
                      bgcolor:
                        selectedTime === slot.time ? "#1565c0" : "#f5f5f5",
                      border:
                        selectedTime === slot.time
                          ? "none"
                          : "1px solid #1976d2",
                    },
                    "&::before": {
                      content: '""',
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#4caf50",
                      marginRight: 1,
                      display:
                        selectedTime === slot.time ? "none" : "inline-block",
                    },
                    transform:
                      selectedTime === slot.time ? "scale(0.9)" : "scale(1)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {slot.time}
                </Button>
              </Grid>
              {selectedTime === slot.time && (
                <Grid size={{ xs: 6 }}>
                  <AnimatedNextButton
                    fullWidth
                    variant="contained"
                    onClick={handleNextClick}
                    sx={{
                      py: 1,
                      borderRadius: 1,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      bgcolor: "#000",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#333",
                      },
                    }}
                  >
                    Next
                  </AnimatedNextButton>
                </Grid>
              )}
            </Grid>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default TimeSlotSelector;
