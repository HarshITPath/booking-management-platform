"use client";
import React from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import { Form } from "@/components/form";
import Input from "@/components/inputs";
 
interface BookingFormProps {
  bookingFormFields: any[];
  methods: any;
  onSubmit: any;
  loading: boolean;
  selectedDate: any;
  selectedSlot: any;
}
 
const BookingForm: React.FC<BookingFormProps> = ({ bookingFormFields, methods, onSubmit, loading }) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 4,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Form {...{ methods, onSubmit }}>
        <Stack sx={{gap:2}}>
          <Grid container spacing={{ xs: 2 }}>
            {bookingFormFields?.map(({ id, gridProps, ...rest }) => {
              return (
                <Grid key={id} {...gridProps}>
                  <Input {...rest} />
                </Grid>
              );
            })}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "start" }}
            {...{ loading }}
          >
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};
 
export default BookingForm;