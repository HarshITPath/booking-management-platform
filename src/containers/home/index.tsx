"use client";
import React from "react";
import ContainerWrapper from "@/components/container-wrapper";
import { Stack, Grid, Button } from "@mui/material";
import ProductDemoSidebar from "./meeting-info";
import TimeSlotSelector from "./time-slot";
import BookingForm from "./booking-form";
import DateCalendarViews from "./calendar";
import useBookingForm from "@/hooks/booking-form/useBookingForm";
 
export default function Home() {
  const {
    bookingFormFields,
    methods,
    onSubmit,
    loading,
    selectedDate,
    showForm,
    setShowForm,
    handleDateSelect,
    handleBackClick,
    timezonData,
    selectedTimezone,
    setSelectedTimezone,
    availableSlots,
    selectedSlot,
    handleSlotSelect,
    timeFormat,
    handleTimeFormatToggle,
    slotLoading,
  } = useBookingForm({});
 
  return (
    <Stack
      sx={{
        minHeight: "100dvh",
        height: "100dvh",
        width: "100%",
        py: 6,
        bgcolor: "#f5f5f5",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <ContainerWrapper>
          <Grid container spacing={{ xs: 2 }}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <ProductDemoSidebar />
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }}>
              {showForm ? (
                <Stack spacing={2}>
                  <Button
                    variant="text"
                    onClick={handleBackClick}
                    sx={{ alignSelf: "flex-start", mb: 2 }}
                  >
                    Back
                  </Button>
                  <BookingForm
                    bookingFormFields={bookingFormFields}
                    methods={methods}
                    onSubmit={onSubmit}
                    loading={loading}
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                  />
                </Stack>
              ) : (
                <Grid container spacing={{ xs: 2 }}>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <DateCalendarViews
                      onDateSelect={handleDateSelect}
                      selectedDate={selectedDate}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TimeSlotSelector
                      selectedDate={selectedDate}
                      show={!!selectedDate}
                      availableSlots={availableSlots}
                      selectedSlot={selectedSlot}
                      onSlotSelect={handleSlotSelect}
                      onNext={() => setShowForm(true)}
                      timezoneOptions={timezonData}
                      selectedTimezone={selectedTimezone}
                      setSelectedTimezone={setSelectedTimezone}
                      timeFormat={timeFormat}
                      onTimeFormatToggle={handleTimeFormatToggle}
                      slotLoading={slotLoading}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </ContainerWrapper>
      </Stack>
    </Stack>
  );
}