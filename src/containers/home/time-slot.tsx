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
} from "@mui/material";
import AutoComplete from "@/components/inputs/auto-complete";
import { FiberManualRecord } from "@mui/icons-material";
import { Moment } from "moment";
interface TimeSlotSelectorProps {
  selectedDate: Moment | null;
  show: boolean;
  availableSlots: { local: string; utc: string; display: string }[];
  selectedSlot: { local: string; utc: string; display: string } | null;
  onSlotSelect: (slot: { local: string; utc: string; display: string }) => void;
  onNext: () => void;
  timezoneOptions?: { id: string; label: string }[];
  selectedTimezone: { id: string; label: string } | null;
  setSelectedTimezone: (tz: { id: string; label: string } | null) => void;
  timeFormat: '12h' | '24h';
  onTimeFormatToggle: (format: '12h' | '24h') => void;
  slotLoading: boolean;
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
  availableSlots = [],
  selectedSlot,
  onSlotSelect,
  onNext,
  timezoneOptions = [],
  selectedTimezone,
  setSelectedTimezone,
  timeFormat,
  onTimeFormatToggle,
  slotLoading,
}) => {
  if (!show || !selectedDate) {
    return null;
  }
 
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
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {selectedDate.format("dddd, MMMM D")}
          </Typography>
          {timezoneOptions.length > 0 && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                Select your timezone
              </Typography>
              <AutoComplete
                size="small"
                options={timezoneOptions}
                placeholder="Choose timezone"
                field={{
                  value: selectedTimezone,
                  onChange: (value: any) => setSelectedTimezone(value),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    py: "0px !important",
                    input: {
                      py: "0px !important",
                      height: "36px",
                    },
                  },
                }}
              />
            </Box>
          )}
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              variant={timeFormat === '12h' ? 'contained' : 'outlined'}
              onClick={() => onTimeFormatToggle('12h')}
              size="small"
            >
              12h
            </Button>
            <Button
              variant={timeFormat === '24h' ? 'contained' : 'outlined'}
              onClick={() => onTimeFormatToggle('24h')}
              size="small"
            >
              24h
            </Button>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <FiberManualRecord sx={{ fontSize: 12, color: "#4caf50" }} />
            <Typography variant="body2" sx={{ color: "#666" }}>
              times you are available
            </Typography>
          </Box>
        </Box>
        <Stack spacing={1}>
          {slotLoading ? (
            <Typography variant="body2">Loading slots...</Typography>
          ) : availableSlots.length === 0 ? (
            <Typography variant="body2">No available slots</Typography>
          ) : (
            availableSlots.map((slot) => (
              <Grid container key={slot.utc} alignItems="center" spacing={1}>
                <Grid size={{xs:selectedSlot?.utc === slot.utc ? 6 : 12}} >
                  <Button
                    fullWidth
                    variant={selectedSlot?.utc === slot.utc ? "contained" : "outlined"}
                    onClick={() => onSlotSelect(slot)}
                    sx={{
                      justifyContent: "flex-start",
                      py: 1,
                      px: 2,
                      borderRadius: 1,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      border:
                        selectedSlot?.utc === slot.utc ? "none" : "1px solid #e0e0e0",
                      bgcolor:
                        selectedSlot?.utc === slot.utc ? "#1976d2" : "transparent",
                      color: selectedSlot?.utc === slot.utc ? "white" : "#1a202c",
                      "&:hover": {
                        bgcolor:
                          selectedSlot?.utc === slot.utc ? "#1565c0" : "#f5f5f5",
                        border:
                          selectedSlot?.utc === slot.utc
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
                          selectedSlot?.utc === slot.utc ? "none" : "inline-block",
                      },
                      transform:
                        selectedSlot?.utc === slot.utc ? "scale(0.9)" : "scale(1)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {slot.display}
                  </Button>
                </Grid>
                {selectedSlot?.utc === slot.utc && (
                  <Grid size={{xs:6}}>
                    <AnimatedNextButton
                      fullWidth
                      variant="contained"
                      onClick={onNext}
                      disabled={!selectedTimezone}
                      sx={{
                        py: 1,
                        borderRadius: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        bgcolor: selectedTimezone ? "#000" : "#ccc",
                        color: "white",
                        "&:hover": {
                          bgcolor: selectedTimezone ? "#333" : "#ccc",
                        },
                      }}
                    >
                      Next
                    </AnimatedNextButton>
                  </Grid>
                )}
              </Grid>
            ))
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
 
export default TimeSlotSelector;