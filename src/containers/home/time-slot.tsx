// "use client";
// import React from "react";
// import {
//   Box,
//   Typography,
//   Stack,
//   Button,
//   Grid,
//   keyframes,
//   styled,
//   Skeleton,
// } from "@mui/material";
// import AutoComplete from "@/components/inputs/auto-complete";
// import { Moment } from "moment";
// import { ICONS } from "@/assets/icons";

// interface TimeSlotSelectorProps {
//   selectedDate: Moment | null;
//   show: boolean;
//   availableSlots: { local: string; utc: string; display: string }[];
//   selectedSlot: { local: string; utc: string; display: string } | null;
//   onSlotSelect: (slot: { local: string; utc: string; display: string }) => void;
//   onNext: () => void;
//   timezoneOptions?: { id: string; label: string }[];
//   selectedTimezone: { id: string; label: string } | null;
//   setSelectedTimezone: (tz: { id: string; label: string } | null) => void;
//   timeFormat: "12h" | "24h";
//   onTimeFormatToggle: (format: "12h" | "24h") => void;
//   slotLoading: boolean;
//   timZonesLoading: boolean;
// }

// const slideIn = keyframes`
//   from {
//     transform: translateX(20px);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// `;

// const AnimatedNextButton = styled(Button)({
//   animation: `${slideIn} 0.2s ease-out forwards`,
// });

// // Skeleton component that matches the button style
// const TimeSlotSkeleton: React.FC = () => (
//   <Grid container alignItems="center" spacing={1}>
//     <Grid size={{ xs: 12 }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           py: 1,
//           px: 2,
//           borderRadius: 1,
//           border: "1px solid #e0e0e0",
//           bgcolor: "transparent",
//           height: "42px", // Match button height
//         }}
//       >
//         <Skeleton
//           variant="circular"
//           width={8}
//           height={8}
//           sx={{ marginRight: 1, flexShrink: 0 }}
//         />
//         <Skeleton
//           variant="text"
//           width="60%"
//           height={20}
//           sx={{ fontSize: "0.875rem" }}
//         />
//       </Box>
//     </Grid>
//   </Grid>
// );

// const TimeZonesSkeleton: React.FC = () => (
//   <Grid container alignItems="center" spacing={1}>
//     <Grid size={{ xs: 12 }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           py: 1,
//           px: 2,
//           borderRadius: 1,
//           border: "1px solid #e0e0e0",
//           bgcolor: "transparent",
//           height: "42px"
//         }}
//       >
//         <Skeleton
//           variant="text"
//           width="60%"
//           height={20}
//           sx={{ fontSize: "0.875rem" }}
//         />
//       </Box>
//     </Grid>
//   </Grid>
// );

// const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
//   selectedDate,
//   show,
//   availableSlots = [],
//   selectedSlot,
//   onSlotSelect,
//   onNext,
//   timezoneOptions = [],
//   selectedTimezone,
//   setSelectedTimezone,
//   timeFormat,
//   onTimeFormatToggle,
//   slotLoading,
//   timZonesLoading,
// }) => {
//   if (!show || !selectedDate) {
//     return null;
//   }

//   // Generate skeleton slots (show 6-8 skeleton items during loading)
//   const skeletonSlots = Array.from({ length: 7 }, (_, index) => (
//     <TimeSlotSkeleton key={`skeleton-${index}`} />
//   ));

//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         p: 3,
//         borderRadius: 2,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         height: "100%",
//         maxHeight: "600px", // Set max height for the entire component
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Stack spacing={2} sx={{ height: "100%" }}>
//         {/* Header section - Fixed */}
//         <Box sx={{ flexShrink: 0 }}>
//           <Typography variant="h6" fontWeight="bold">
//             {selectedDate.format("dddd, MMMM D")}
//           </Typography>
//           {timZonesLoading ? (
//             <TimeZonesSkeleton />
//           ) : (
//             <>
//               {timezoneOptions.length > 0 && (
//                 <Box sx={{ mt: 2, mb: 1 }}>
//                   <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
//                     Select your timezone
//                   </Typography>
//                   <AutoComplete
//                     size="small"
//                     options={timezoneOptions}
//                     placeholder="Choose timezone"
//                     field={{
//                       value: selectedTimezone,
//                       onChange: (value: any) => setSelectedTimezone(value),
//                     }}
//                     sx={{
//                       "& .MuiInputBase-root": {
//                         py: "0px !important",
//                         input: {
//                           py: "0px !important",
//                           height: "36px",
//                         },
//                       },
//                     }}
//                     loading={timZonesLoading}
//                   />
//                 </Box>
//               )}
//             </>
//           )}

//           <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
//             <Button
//               variant={timeFormat === "12h" ? "contained" : "outlined"}
//               onClick={() => onTimeFormatToggle("12h")}
//               size="small"
//             >
//               12h
//             </Button>
//             <Button
//               variant={timeFormat === "24h" ? "contained" : "outlined"}
//               onClick={() => onTimeFormatToggle("24h")}
//               size="small"
//             >
//               24h
//             </Button>
//           </Stack>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
//             <ICONS.Online sx={{ fontSize: 12, color: "#4caf50" }} />
//             <Typography variant="body2" sx={{ color: "#666" }}>
//               Times you are available
//             </Typography>
//           </Box>
//         </Box>

//         {/* Scrollable slots section */}
//         <Box
//           sx={{
//             flex: 1,
//             overflow: "hidden",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box
//             sx={{
//               flex: 1,
//               overflowY: "auto",
//               overflowX: "hidden",
//               maxHeight: "350px",
//               minHeight: "200px",
//               pr: 0.5,
//               "&::-webkit-scrollbar": {
//                 width: "6px",
//               },
//               "&::-webkit-scrollbar-track": {
//                 background: "#f1f1f1",
//                 borderRadius: "3px",
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 background: "#c1c1c1",
//                 borderRadius: "3px",
//                 "&:hover": {
//                   background: "#a8a8a8",
//                 },
//               },
//               // Firefox scrollbar styles
//               scrollbarWidth: "thin",
//               scrollbarColor: "#c1c1c1 #f1f1f1",
//             }}
//           >
//             <Stack spacing={2}>
//               {slotLoading
//                 ? skeletonSlots
//                 : // Show actual slots
//                   availableSlots.map((slot) => (
//                     <Grid
//                       container
//                       key={slot.utc}
//                       alignItems="center"
//                       spacing={1}
//                     >
//                       <Grid
//                         size={{ xs: selectedSlot?.utc === slot.utc ? 6 : 12 }}
//                       >
//                         <Button
//                           fullWidth
//                           variant={
//                             selectedSlot?.utc === slot.utc
//                               ? "contained"
//                               : "outlined"
//                           }
//                           onClick={() => onSlotSelect(slot)}
//                           sx={{
//                             justifyContent: "flex-start",
//                             py: 1,
//                             px: 2,
//                             borderRadius: 1,
//                             textTransform: "none",
//                             fontWeight: 500,
//                             fontSize: "16px",
//                             minHeight: "42px",
//                             border:
//                               selectedSlot?.utc === slot.utc
//                                 ? "none"
//                                 : "1px solid #e0e0e0",
//                             bgcolor:
//                               selectedSlot?.utc === slot.utc
//                                 ? "primary.main"
//                                 : "transparent",
//                             color:
//                               selectedSlot?.utc === slot.utc
//                                 ? "white"
//                                 : "#1a202c",
//                             "&:hover": {
//                               bgcolor:
//                                 selectedSlot?.utc === slot.utc
//                                   ? "primary.main"
//                                   : "#f5f5f5",
//                               border:
//                                 selectedSlot?.utc === slot.utc
//                                   ? "none"
//                                   : "1px solid #0000FF",
//                             },
//                             "&::before": {
//                               content: '""',
//                               width: 8,
//                               height: 8,
//                               borderRadius: "50%",
//                               backgroundColor: "#4caf50",
//                               marginRight: 1,
//                               display:
//                                 selectedSlot?.utc === slot.utc
//                                   ? "none"
//                                   : "inline-block",
//                             },
//                             transform:
//                               selectedSlot?.utc === slot.utc
//                                 ? "scale(0.98)"
//                                 : "scale(1)",
//                             transition: "all 0.2s ease",
//                           }}
//                         >
//                           {slot.display}
//                         </Button>
//                       </Grid>
//                       {selectedSlot?.utc === slot.utc && (
//                         <Grid size={{ xs: 6 }}>
//                           <AnimatedNextButton
//                             fullWidth
//                             variant="contained"
//                             onClick={onNext}
//                             disabled={!selectedTimezone}
//                             sx={{
//                               py: 1,
//                               borderRadius: 1,
//                               textTransform: "none",
//                               fontWeight: 600,
//                               fontSize: "0.875rem",
//                               minHeight: "42px",
//                               bgcolor: selectedTimezone ? "#000" : "#ccc",
//                               color: "white",
//                               "&:hover": {
//                                 bgcolor: selectedTimezone ? "#333" : "#ccc",
//                               },
//                             }}
//                           >
//                             Next
//                           </AnimatedNextButton>
//                         </Grid>
//                       )}
//                     </Grid>
//                   ))}
//             </Stack>
//           </Box>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default TimeSlotSelector;

"use client";
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  keyframes,
  styled,
  Skeleton,
  Chip,
  alpha,
  Fade,
} from "@mui/material";
import AutoComplete from "@/components/inputs/auto-complete";
import { Moment } from "moment";
import { ICONS } from "@/assets/icons";

interface TimeSlotSelectorProps {
  selectedDate: Moment | null;
  show: boolean;
  availableSlots: { local: string; utc: string; display: string }[];
  selectedSlot: { local: string; utc: string; display: string } | null;
  handleSlotSelect: (slot: {
    local: string;
    utc: string;
    display: string;
  }) => void;
  onNext: () => void;
  timezoneData?: { id: string; label: string }[];
  selectedTimezone: { id: string; label: string } | null;
  setSelectedTimezone: (tz: { id: string; label: string } | null) => void;
  timeFormat: "12h" | "24h";
  handleTimeFormatToggle: (format: "12h" | "24h") => void;
  slotLoading: boolean;
  timZonesLoading: boolean;
}

// Enhanced animations
const slideInRight = keyframes`
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
  }
`;

const AnimatedNextButton = styled(Button)(({ theme }) => ({
  animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  "&:not(:disabled)": {
    animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards, ${pulseGlow} 2s infinite`,
  },
}));

// Enhanced skeleton components
const TimeSlotSkeleton: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      py: 2,
      px: 3,
      borderRadius: 3,
      border: "2px solid #f1f5f9",
      bgcolor: "white",
      height: "60px",
    }}
  >
    <Skeleton
      variant="circular"
      width={10}
      height={10}
      sx={{ marginRight: 2, flexShrink: 0 }}
    />
    <Skeleton
      variant="text"
      width="65%"
      height={24}
      sx={{ fontSize: "1rem" }}
    />
  </Box>
);

const TimeZonesSkeleton: React.FC = () => (
  <Box
    sx={{
      p: 2,
      borderRadius: 3,
      border: "2px solid #f1f5f9",
      bgcolor: "white",
      height: "56px",
    }}
  >
    <Skeleton
      variant="text"
      width="70%"
      height={24}
      sx={{ fontSize: "1rem" }}
    />
  </Box>
);

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  show,
  availableSlots = [],
  selectedSlot,
  handleSlotSelect,
  onNext,
  timezoneData = [],
  selectedTimezone,
  setSelectedTimezone,
  timeFormat,
  handleTimeFormatToggle,
  slotLoading,
  timZonesLoading,
}) => {
  if (!show || !selectedDate) {
    return null;
  }

  const skeletonSlots = Array.from({ length: 6 }, (_, index) => (
    <TimeSlotSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <Fade in timeout={400}>
      <Stack
        sx={{
          bgcolor: "common.white",
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
            background: "linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6)",
          },
        }}
      >
        <Stack spacing={3} sx={{ height: "100%" }}>
          {/* Header Section */}
          <Stack spacing={1}>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                color: "#1e293b",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <ICONS.Calendar sx={{ color: "#3b82f6", fontSize: 28 }} />
              {selectedDate?.format("dddd, MMMM D")}
            </Typography>

            {timZonesLoading ? (
              <TimeZonesSkeleton />
            ) : (
              timezoneData?.length > 0 && (
                <>
                  <Typography variant="body2">Select Timezone</Typography>
                  <AutoComplete
                    size="medium"
                    options={timezoneData}
                    placeholder="Choose your timezone"
                    field={{
                      value: selectedTimezone,
                      onChange: (value: any) => setSelectedTimezone(value),
                    }}
                    loading={timZonesLoading}
                  />
                </>
              )
            )}

            {/* Time Format Toggle */}
            <Stack spacing={1}>
              <Typography variant="body2">Time Format</Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant={timeFormat === "12h" ? "contained" : "outlined"}
                  onClick={() => handleTimeFormatToggle("12h")}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    px: 2.5,
                    py: 1,
                    fontWeight: 600,
                    borderColor: timeFormat === "12h" ? "#0000FF" : "#e2e8f0",
                    bgcolor: timeFormat === "12h" ? "#0000FF" : "transparent",
                    color: timeFormat === "12h" ? "common.white" : "#64748b",
                    "&:hover": {
                      borderColor: "#0000FF",
                    },
                  }}
                >
                  12h
                </Button>
                <Button
                  variant={timeFormat === "24h" ? "contained" : "outlined"}
                  onClick={() => handleTimeFormatToggle("24h")}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    px: 2.5,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    border: "2px solid",
                    borderColor: timeFormat === "24h" ? "#0000FF" : "#e2e8f0",
                    bgcolor: timeFormat === "24h" ? "#0000FF" : "transparent",
                    color: timeFormat === "24h" ? "common.white" : "#64748b",
                    "&:hover": {
                      borderColor: "#3b82f6",
                    },
                  }}
                >
                  24h
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* Available Times Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <ICONS.Online sx={{ fontSize: 14, color: "#10b981" }} />
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                color: "#64748b",
                fontSize: "0.875rem",
              }}
            >
              Available time slots
            </Typography>
            {availableSlots.length > 0 && (
              <Chip
                label={`${availableSlots.length} slots`}
                size="small"
                sx={{
                  bgcolor: alpha("#10b981", 0.1),
                  color: "#10b981",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: 20,
                }}
              />
            )}
          </Box>

          {/* Scrollable Slots Section */}
          <Box
            sx={{
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "400px",
              minHeight: "250px",
              pr: 1,
              scrollbarWidth: "thin",
            }}
          >
            <Stack spacing={2}>
              {slotLoading ? (
                skeletonSlots
              ) : availableSlots.length === 0 ? (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    px: 3,
                    bgcolor: alpha("#f1f5f9", 0.5),
                    borderRadius: 3,
                    border: "2px dashed #cbd5e1",
                  }}
                >
                  <ICONS.Time sx={{ fontSize: 48, color: "#cbd5e1", mb: 2 }} />
                  <Typography
                    variant="body1"
                    fontWeight="600"
                    color="#64748b"
                    sx={{ mb: 1 }}
                  >
                    No available slots
                  </Typography>
                  <Typography variant="body2" color="#94a3b8">
                    Please select a different date
                  </Typography>
                </Box>
              ) : (
                availableSlots?.map((slot, index) => (
                  <Grid
                    container
                    key={slot.utc}
                    alignItems="center"
                    spacing={1.5}
                    sx={{
                      animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0,
                    }}
                  >
                    <Grid
                      size={{ xs: selectedSlot?.utc === slot.utc ? 6 : 12 }}
                    >
                      <Button
                        fullWidth
                        variant={
                          selectedSlot?.utc === slot.utc
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => handleSlotSelect(slot)}
                        sx={{
                          fontWeight: 600,
                          height: "50px !important",
                          border: "2px solid",
                          borderColor:
                            selectedSlot?.utc === slot.utc
                              ? "#0000FF"
                              : "#e2e8f0",
                          bgcolor:
                            selectedSlot?.utc === slot.utc
                              ? "#0000FF"
                              : "common.white",
                          color:
                            selectedSlot?.utc === slot.utc
                              ? "common.white"
                              : "common.black",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width:
                              selectedSlot?.utc === slot.utc ? "0px" : "4px",
                            bgcolor: "#10b981",
                            transition: "width 0.2s ease",
                          },
                          "&:hover": {
                            borderColor: "#0000FF",
                            bgcolor:
                              selectedSlot?.utc === slot.utc
                                ? "#0000FF"
                                : alpha("#0000FF", 0.04),
                            transform: "translateY(-2px)",
                            "&::before": {
                              width:
                                selectedSlot?.utc === slot.utc ? "0px" : "6px",
                            },
                          },
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          {selectedSlot?.utc !== slot.utc && (
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: "#10b981",
                              }}
                            />
                          )}
                          <Typography variant="inherit">
                            {slot.display}
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>

                    {selectedSlot?.utc === slot.utc && (
                      <Grid size={{ xs: 6 }}>
                        <AnimatedNextButton
                          fullWidth
                          variant="contained"
                          onClick={onNext}
                          disabled={!selectedTimezone}
                          sx={{
                            fontWeight: 700,
                            height: "50px !important",
                            bgcolor: selectedTimezone
                              ? "common.black"
                              : "#94a3b8",
                            color: "common.white",
                            boxShadow: selectedTimezone
                              ? "0 8px 25px rgba(0,0,0,0.3)"
                              : "none",
                            "&:hover": {
                              bgcolor: selectedTimezone
                                ? "common.black"
                                : "#94a3b8",
                              transform: selectedTimezone
                                ? "translateY(-2px)"
                                : "none",
                              boxShadow: selectedTimezone
                                ? "0 12px 32px rgba(0,0,0,0.4)"
                                : "none",
                            },
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          Next →
                        </AnimatedNextButton>
                      </Grid>
                    )}
                  </Grid>
                ))
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Fade>
  );
};

export default TimeSlotSelector;
