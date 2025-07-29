"use client";
import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Moment } from "moment";

interface DateCalendarViewsProps {
  handleDateSelect: (date: Moment | null) => void;
  selectedDate: Moment | null;
  blackoutDates?: string[];
  disabledDays?: number[];
}

export default function DateCalendarViews({
  handleDateSelect,
  selectedDate,
  blackoutDates = [],
  disabledDays = [],
}: DateCalendarViewsProps) {
  const handleDateChange = (newDate: Moment | null) => {
    handleDateSelect(newDate);
  };

  const shouldDisableDate = (date: Moment) => {
    const isBlackout = blackoutDates.includes(date.format("YYYY-MM-DD"));
    const isDisabledDay = disabledDays.includes(date.day());
    return isBlackout || isDisabledDay;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateCalendar
        views={["day"]}
        disablePast
        shouldDisableDate={shouldDisableDate}
        // sx={{
        //   "& .MuiCalendarPicker-root": {
        //     width: "100%",
        //     overflow: "visible",
        //   },
        // }}

        sx={{
          "&.MuiDateCalendar-root": {
            margin: 0,
            // overflow: "visible",
            width: "100%",
            padding: { xs: 2, sm: 3, md: 4 },
            bgcolor: "common.white",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            minHeight: { xs: "400px", sm: "430px", md: "600px" },
            fontFamily: "'Inter', 'Roboto', sans-serif",
          },

          // Calendar header styling
          "& .MuiPickersCalendarHeader-root": {
            paddingLeft: { xs: 1, sm: 2 },
            paddingRight: { xs: 1, sm: 2 },
            marginTop: 0,
            marginBottom: { xs: 1, sm: 2 },
          },

          "& .MuiPickersCalendarHeader-label": {
            fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
            fontWeight: 600,
            color: "#1a1a1a",
          },

          "& .MuiPickersArrowSwitcher-root": {
            "& .MuiIconButton-root": {
              padding: { xs: "6px", sm: "8px" },
              borderRadius: "50%",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#f5f5f5",
                transform: "scale(1.1)",
              },
            },
          },

          // Week days header
          "& .MuiDayCalendar-header": {
            justifyContent: "space-between",
            px: { xs: 1, sm: 2 },
            marginBottom: { xs: 1, sm: 2 },
          },

          "& .MuiDayCalendar-weekDayLabel": {
            width: { xs: "38px", sm: "44px", md: "52px" },
            height: { xs: "32px", sm: "36px", md: "40px" },
            margin: { xs: "0 1px", sm: "0 2px", md: "0 3px" },
            fontWeight: 600,
            fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" },
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          },

          // Week container
          "& .MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
            margin: { xs: "12px 0", md: "16px 0" },
            px: { xs: 1, sm: 2 },
          },

          // Individual day styling
          "& .MuiPickersDay-root": {
            width: { xs: "38px", sm: "44px", md: "52px" },
            height: { xs: "38px", sm: "44px", md: "52px" },
            margin: { xs: "0 1px", sm: "0 2px", md: "0 3px" },
            fontWeight: 500,
            borderRadius: { xs: "8px", sm: "10px", md: "12px" },
            fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
            border: "2px solid transparent",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",

            "&:hover": {
              border: "2px solid #0000FF",
              bgcolor: "#eff6ff",
              transform: "scale(1.05)",
            },

            "&.Mui-selected": {
              bgcolor: "#0000FF !important",
              color: "white !important",
              fontWeight: 600,
              border: "2px solid #0000FF",
              transform: "scale(1.05)",
              "&:hover": {
                bgcolor: "#0000FF !important",
                border: "2px solid #0000FF",
                transform: "scale(1.08)",
              },
            },

            "&.Mui-disabled": {
              bgcolor: "#f9fafb",
              color: "#d1d5db",
              border: "2px solid transparent",
              "&:hover": {
                transform: "none",
                boxShadow: "none",
                border: "2px solid transparent",
              },
            },

            // Today's date styling
            "&.MuiPickersDay-today": {
              border: "2px solid #10b981",
              bgcolor: "#ecfdf5",
              color: "#065f46",
              fontWeight: 600,
              "&:not(.Mui-selected):hover": {
                bgcolor: "#d1fae5",
                border: "2px solid #059669",
              },
            },
          },

          // Slide transition container
          "& .MuiPickersSlideTransition-root": {
            minHeight: { xs: "240px", sm: "280px", md: "320px" },
            overflow: "visible",
          },

          // Outside days (previous/next month)
          "& .MuiPickersDay-hiddenDaySpacingFiller": {
            width: { xs: "38px", sm: "44px", md: "52px" },
            height: { xs: "38px", sm: "44px", md: "52px" },
          },
        }}
        value={selectedDate}
        onChange={handleDateChange}
        dayOfWeekFormatter={(day: Moment) => {
          const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return dayStrings[day.day()];
        }}
      />
    </LocalizationProvider>
  );
}
