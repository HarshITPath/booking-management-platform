// "use client";
// import React from "react";
// import ContainerWrapper from "@/components/container-wrapper";
// import { Stack, Grid } from "@mui/material";
// import TimeSlotSelector from "./time-slot";
// import BookingForm from "./booking-form";
// import DateCalendarViews from "./calendar";
// import useBookingForm from "@/hooks/booking-form/useBookingForm";
// import BookingConfirmation from "./booking-confirmation";
// import moment from "moment";
// import InvalidBookingLink from "./invalid-booking";
// import Button from "@/components/button";
// import MeetingInfo from "./meeting-info";

// type HomeProps = {
//   agentCode?: string;
//   slot?: string;
// };

// export default function Home({ agentCode, slot }: HomeProps) {
//   const {
//     bookingFormFields,
//     methods,
//     onSubmit,
//     loading,
//     selectedDate,
//     showForm,
//     setShowForm,
//     handleDateSelect,
//     handleBackClick,
//     timezonData,
//     selectedTimezone,
//     setSelectedTimezone,
//     availableSlots,
//     selectedSlot,
//     handleSlotSelect,
//     timeFormat,
//     handleTimeFormatToggle,
//     slotLoading,
//     bookingConfirmation,
//     isBookingLinkInvalid,
//     blackoutDates,
//     disabledDays,
//     eventDetails,
//     timZonesLoading
//   } = useBookingForm({ agentCode, slot });

//   return (
//     <Stack
//       sx={{
//         minHeight: "100dvh",
//         width: "100%",
//         py: 6,
//         bgcolor: "#f5f5f5",
//       }}
//     >
//       <Stack sx={{ height: "100%" }}>
//         <ContainerWrapper>
//           {isBookingLinkInvalid ? (
//             <InvalidBookingLink />
//           ) : bookingConfirmation ? (
//             <BookingConfirmation
//               details={{
//                 first_name: bookingConfirmation.userName.split(" ")[0],
//                 last_name: bookingConfirmation.userName.split(" ")[1] || "",
//                 email_id: bookingConfirmation.userEmail,
//                 phone_number: "",
//                 message: bookingConfirmation.additionalNotes,
//                 date: moment(bookingConfirmation.startTime)
//                   .tz(bookingConfirmation.userTimezone)
//                   .format("MMMM D, YYYY"),
//                 time: `${moment(bookingConfirmation.startTime)
//                   .tz(bookingConfirmation.userTimezone)
//                   .format("h:mm A")} - ${moment(bookingConfirmation.endTime)
//                   .tz(bookingConfirmation.userTimezone)
//                   .format("h:mm A")}`,
//               }}
//             />
//           ) : (
//             <Grid container spacing={{ xs: 3, md: 4 }}>
//               <Grid size={{ xs: 12, lg: 3 }}>
//                 <MeetingInfo
//                   event={eventDetails}
//                   showForm={showForm}
//                   selectedSlot={selectedSlot}
//                   selectedDate={selectedDate}
//                   selectedTimezone={selectedTimezone}
//                 />
//               </Grid>
//               <Grid size={{ xs: 12, lg: 9 }}>
//                 {showForm ? (
//                   <Stack spacing={2}>
//                     <Button
//                       variant="outlined"
//                       onClick={handleBackClick}
//                       sx={{ alignSelf: "flex-start", mb: 2 }}
//                     >
//                       {"Back"}
//                     </Button>
//                     <BookingForm
//                       bookingFormFields={bookingFormFields}
//                       methods={methods}
//                       onSubmit={onSubmit}
//                       loading={loading}
//                       selectedDate={selectedDate}
//                       selectedSlot={selectedSlot}
//                     />
//                   </Stack>
//                 ) : (
//                   <Grid container spacing={{ xs: 3, md: 4 }}>
//                     <Grid size={{ xs: 12, md: 7, lg: 8 }}>
//                       <DateCalendarViews
//                         onDateSelect={handleDateSelect}
//                         selectedDate={selectedDate}
//                         blackoutDates={blackoutDates}
//                         disabledDays={disabledDays}
//                       />
//                     </Grid>
//                     <Grid size={{ xs: 12, md: 5, lg: 4 }}>
//                       <TimeSlotSelector
//                         selectedDate={selectedDate}
//                         show={!!selectedDate}
//                         availableSlots={availableSlots}
//                         selectedSlot={selectedSlot}
//                         onSlotSelect={handleSlotSelect}
//                         onNext={() => setShowForm(true)}
//                         timezoneOptions={timezonData}
//                         selectedTimezone={selectedTimezone}
//                         setSelectedTimezone={setSelectedTimezone}
//                         timeFormat={timeFormat}
//                         onTimeFormatToggle={handleTimeFormatToggle}
//                         slotLoading={slotLoading}
//                         timZonesLoading={timZonesLoading}
//                       />
//                     </Grid>
//                   </Grid>
//                 )}
//               </Grid>
//             </Grid>
//           )}
//         </ContainerWrapper>
//       </Stack>
//     </Stack>
//   );
// }

"use client";
import React from "react";
import ContainerWrapper from "@/components/container-wrapper";
import { Stack, Grid, Skeleton, Box } from "@mui/material";
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

// Skeleton component for the left side (MeetingInfo)
const MeetingInfoSkeleton = () => (
  <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2 }}>
    <Skeleton variant="rectangular" height={24} width="80%" sx={{ mb: 2 }} />
    <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
    <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
    <Skeleton variant="text" height={20} width="60%" sx={{ mb: 3 }} />
    <Skeleton variant="rectangular" height={16} width="40%" sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" height={16} width="30%" />
  </Box>
);

// Skeleton component for the calendar
const CalendarSkeleton = () => (
  <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2 }}>
    <Skeleton variant="text" height={32} width="50%" sx={{ mb: 3 }} />
    <Stack spacing={2}>
      {/* Calendar header with days of week */}
      <Grid container spacing={1}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Grid key={index} size={{ xs: 12 / 7 }}>
            <Skeleton variant="rounded" width={44} height={44} />
          </Grid>
        ))}
      </Grid>
      {/* Calendar body with date cells */}
      {Array.from({ length: 5 }).map((_, weekIndex) => (
        <Grid container spacing={1} key={weekIndex}>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <Grid key={dayIndex} size={{ xs: 12 / 7 }}>
              <Skeleton variant="rounded" width={44} height={44} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Stack>
  </Box>
);

// Skeleton component for the time slot selector
const TimeSlotSkeleton = () => (
  <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2 }}>
    <Skeleton variant="text" height={24} width="70%" sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" height={40} sx={{ mb: 3 }} />
    <Stack spacing={1.5}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={48}
          sx={{ borderRadius: 1 }}
        />
      ))}
    </Stack>
    <Skeleton
      variant="rectangular"
      height={44}
      sx={{ mt: 3, borderRadius: 1 }}
    />
  </Box>
);

// Main skeleton component that matches your grid layout
const BookingPageSkeleton = () => (
  <Grid container spacing={{ xs: 3, md: 4 }}>
    <Grid size={{ xs: 12, lg: 3 }}>
      <MeetingInfoSkeleton />
    </Grid>
    <Grid size={{ xs: 12, lg: 9 }}>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <CalendarSkeleton />
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <TimeSlotSkeleton />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

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
    eventDetails,
    timZonesLoading,
    isInitialLoad,
  } = useBookingForm({ agentCode, slot })

    if (isInitialLoad) {
    return <BookingPageSkeleton />;
  }

  if (isBookingLinkInvalid) {
    return <InvalidBookingLink />;
  }
  

  return (
    <Stack
      sx={{
        minHeight: "100dvh",
        width: "100%",
        py: 6,
        bgcolor: "#f5f5f5",
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
                duration:bookingConfirmation.duration
              }}
            />
          ) : (
            <Grid container spacing={{ xs: 3, md: 4 }}>
              <Grid size={{ xs: 12, lg: 3 }}>
                <MeetingInfo
                  event={eventDetails}
                  showForm={showForm}
                  selectedSlot={selectedSlot}
                  selectedDate={selectedDate}
                  selectedTimezone={selectedTimezone}
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 9 }}>
                {showForm ? (
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={handleBackClick}
                      sx={{ alignSelf: "flex-start", mb: 2 }}
                    >
                      {"Back"}
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
                  <Grid container spacing={{ xs: 3, md: 4 }}>
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                      <DateCalendarViews
                        onDateSelect={handleDateSelect}
                        selectedDate={selectedDate}
                        blackoutDates={blackoutDates}
                        disabledDays={disabledDays}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
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
                        timZonesLoading={timZonesLoading}
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
