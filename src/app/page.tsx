"use client";
import React from "react";
import ContainerWrapper from "@/components/container-wrapper";
import DateCalendarViews from "@/components/calendar/index";
import { Stack, Grid, Button } from "@mui/material";
import ProductDemoSidebar from "@/components/product-sidebar/index";
import TimeSlotSelector from "@/components/time-slot/index";
import { Moment } from "moment";
import DemoForm from "@/components/demo-form";

export default function Home() {
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleDateSelect = (date: Moment | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

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
          <Grid container spacing={{ xs: 2 }} >
            <Grid size={{ xs: 12, sm: 3 }}>
              <ProductDemoSidebar />
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }}>
              {showForm ? (
                <Stack spacing={2}>
                  <Button 
                    variant="text" 
                    onClick={handleBackClick}
                    sx={{ alignSelf: 'flex-start', mb: 2 }}
                  >
                    Back
                  </Button>
                  <DemoForm 
                    date={selectedDate} 
                    time={selectedTime} 
                  />
                </Stack>
              ) : (
              <Grid container spacing={{ xs: 2 }}>
                <Grid size={{ xs: 12, sm: 8 }} >
                    <DateCalendarViews
                      onDateSelect={handleDateSelect}
                      selectedDate={selectedDate}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  {/* <TimeSlotSelector selectedDate={selectedDate}
                    show={!!selectedDate} /> */}
                    <TimeSlotSelector 
                      selectedDate={selectedDate}
                      show={!!selectedDate}
                      onTimeSelect={handleTimeSelect}
                      selectedTime={selectedTime}
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
