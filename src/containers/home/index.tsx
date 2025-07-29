"use client";
import React from "react";
import ContainerWrapper from "@/components/container-wrapper";
import { Stack, Grid, Slide } from "@mui/material";
import TimeSlotSelector from "./time-slot";
import BookingForm from "./booking-form";
import DateCalendarViews from "./calendar";
import useBookingForm from "@/hooks/booking-form/useBookingForm";
import BookingConfirmation from "./booking-confirmation";
import moment from "moment";
import InvalidBookingLink from "./invalid-booking";
import Button from "@/components/button";
import MeetingInfo from "./meeting-info";
import { useSearchParams } from "next/navigation";
import BookingSkeleton from "./home-skeleton";

export default function Home() {
  const searchParams = useSearchParams();

  const agentCode = searchParams.get("agentCode") || undefined;
  const slot = searchParams.get("slot") || undefined;

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
    timezoneData,
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
    eventDetails,
    timZonesLoading,
    isInitialLoad,
  } = useBookingForm({ agentCode, slot });

  if (isInitialLoad) {
    return <BookingSkeleton />;
  }

  if (isBookingLinkInvalid) {
    return <InvalidBookingLink />;
  }

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
        py: { xs: 3, sm: 4, md: 6 },
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <ContainerWrapper>
          {bookingConfirmation ? (
            <BookingConfirmation
              details={{
                name: bookingConfirmation?.agent?.name,
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
                duration: bookingConfirmation.duration,
              }}
            />
          ) : (
            <Grid container spacing={{ xs: 3, md: 4 }}>
              <Grid size={{ xs: 12, lg: 3 }}>
                <MeetingInfo
                  {...{
                    showForm,
                    selectedSlot,
                    selectedDate,
                    selectedTimezone,
                    eventDetails,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 9 }}>
                {showForm ? (
                  <Slide direction="left" in timeout={400}>
                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        onClick={handleBackClick}
                        sx={{ alignSelf: "flex-start", mb: 2 }}
                      >
                        {"Back"}
                      </Button>
                      <BookingForm
                        {...{
                          bookingFormFields,
                          methods,
                          onSubmit,
                          loading,
                          selectedDate,
                          selectedSlot,
                        }}
                      />
                    </Stack>
                  </Slide>
                ) : (
                  <Grid container spacing={{ xs: 3, md: 4 }}>
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                      <DateCalendarViews
                        {...{
                          selectedDate,
                          blackoutDates,
                          disabledDays,
                          handleDateSelect,
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                      <TimeSlotSelector
                        {...{
                          selectedDate,
                          availableSlots,
                          selectedSlot,
                          selectedTimezone,
                          setSelectedTimezone,
                          timeFormat,
                          slotLoading,
                          timZonesLoading,
                          handleSlotSelect,
                          timezoneData,
                          handleTimeFormatToggle,
                        }}
                        show={!!selectedDate}
                        onNext={() => setShowForm(true)}
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
