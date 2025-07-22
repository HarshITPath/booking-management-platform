"use client";
import React from "react";
import ContainerWrapper from "@/components/container-wrapper";
import { Stack, Grid, Button } from "@mui/material";
import Sidebar from "./meeting-info";
import TimeSlotSelector from "./time-slot";
import BookingForm from "./booking-form";
import DateCalendarViews from "./calendar";
import useBookingForm from "@/hooks/booking-form/useBookingForm";
import BookingConfirmation from "./booking-confirmation";
import moment from "moment";
import InvalidBookingLink from "./invalid-booking";

type HomeProps = {
  agentCode?: string;
  slot?: string;
};

export default function Home({ agentCode, slot }: HomeProps) {
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
    bookingConfirmation,
    isBookingLinkInvalid,
    blackoutDates,
    disabledDays,
    eventDetails
  } = useBookingForm({ agentCode, slot });

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
          {isBookingLinkInvalid ? (
            <InvalidBookingLink />
          ) : bookingConfirmation ? (
            <BookingConfirmation
              details={{
                first_name: bookingConfirmation.userName.split(" ")[0],
                last_name: bookingConfirmation.userName.split(" ")[1] || "",
                email_id: bookingConfirmation.userEmail,
                phone_number: "",
                message: bookingConfirmation.additionalNotes,
                date: moment(bookingConfirmation.startTime)
                  .tz(bookingConfirmation.userTimezone)
                  .format("MMMM D, YYYY"),
                time: `${moment(bookingConfirmation.startTime)
                  .tz(bookingConfirmation.userTimezone)
                  .format("h:mm A")} - ${moment(bookingConfirmation.endTime)
                  .tz(bookingConfirmation.userTimezone)
                  .format("h:mm A")}`,
              }}
            />
          ) : (
            <Grid container spacing={{ xs: 2 }}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Sidebar event={eventDetails}/>
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
                        blackoutDates={blackoutDates}
                        disabledDays={disabledDays}
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
          )}
        </ContainerWrapper>
      </Stack>
    </Stack>
  );
}
