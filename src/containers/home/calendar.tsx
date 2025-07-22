"use client";
import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Moment } from "moment";

interface DateCalendarViewsProps {
  onDateSelect: (date: Moment | null) => void;
  selectedDate: Moment | null;
  blackoutDates?: string[]; // e.g. ['2025-07-18']
  disabledDays?: number[];
}

export default function DateCalendarViews({
  onDateSelect,
  selectedDate,
  blackoutDates = [],
  disabledDays = [],
}: DateCalendarViewsProps) {
  const handleDateChange = (newDate: Moment | null) => {
    onDateSelect(newDate);
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
        sx={{
          "&.MuiDateCalendar-root": {
            margin: 0,
            width: "100%",
            paddingX: { xs: 2, sm: 4, md: 8 },
            overflow: "visible",
            bgcolor: "common.white",
          },
          "& .MuiCalendarPicker-root": {
            width: "100%",
            overflow: "visible",
          },
          "& .MuiDayCalendar-header": {
            justifyContent: "space-between",
            paddingLeft: 0,
            paddingRight: 0,
          },
          "& .MuiDayCalendar-weekDayLabel": {
            width: 36,
            height: 36,
            margin: "0 1px",
            fontWeight: 600,
            fontSize: "0.875rem",
          },
          "& .MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
            margin: "2px",
          },
          "& .MuiPickersDay-root": {
            width: 36,
            height: 36,
            margin: "0 1px",
            fontWeight: 500,
            borderRadius: "8px",
            fontSize: "0.875rem",
            border: "1px solid transparent",
            "&:hover": {
              border: "1px solid #0000FF",
            },
            "&.Mui-selected": {
              bgcolor: "primary.main",
              color: "white",
              fontWeight: 600,
              borderRadius: 1,
              "&:hover": {
                bgcolor: "primary.main",
              },
            },
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
