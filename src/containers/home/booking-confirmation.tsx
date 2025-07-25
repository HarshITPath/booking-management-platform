"use client";
import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { ICONS } from "@/assets/icons";

interface BookingConfirmationProps {
  details: {
    first_name: string;
    last_name: string;
    email_id: string;
    phone_number: string;
    message: string;
    organization?: string;
    date: string;
    time: string;
    name:string,
    duration:number
  };
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  details,
}) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 4,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: 500,
        mx: "auto",
        mt: 6,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <ICONS.Confirmation sx={{ color: "#4caf50", fontSize: 48 }} />
        <Typography variant="h5" fontWeight="bold" align="center">
          This meeting is scheduled
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          We sent an email with a calendar invitation with the details to
          everyone.
        </Typography>
        <Stack spacing={2.5} width="100%">
          <Stack>
            <Typography variant="subtitle1" color="text.secondary">
              What
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {details?.duration} Minutes Meeting with {details?.name}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="subtitle2" color="text.secondary">
              When
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {details.date}, {details?.time}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="subtitle2" color="text.secondary">
              Who
            </Typography>
            <Typography variant="body1">
              {details?.first_name} {details?.last_name} <br />
              {details?.email_id}
            </Typography>
          </Stack>
        </Stack>
        {/* <Divider sx={{ height: "2px", width: "100%" }} /> */}
      </Stack>
    </Box>
  );
};

export default BookingConfirmation;
