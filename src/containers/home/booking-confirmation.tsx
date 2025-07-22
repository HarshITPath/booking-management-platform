"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
        <CheckCircleOutlineIcon sx={{ color: "#4caf50", fontSize: 48 }} />
        <Typography variant="h5" fontWeight="bold" align="center">
          This meeting is scheduled
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          We sent an email with a calendar invitation with the details to
          everyone.
        </Typography>
        <Box width="100%" mt={2}>
          <Typography variant="subtitle2" color="text.secondary">
            What
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            30 Min Meeting between {details.first_name} {details.last_name}
          </Typography>
        </Box>
        <Box width="100%">
          <Typography variant="subtitle2" color="text.secondary">
            When
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {details.date}, {details.time}
          </Typography>
        </Box>
        <Box width="100%">
          <Typography variant="subtitle2" color="text.secondary">
            Who
          </Typography>
          <Typography variant="body1">
            {details.first_name} {details.last_name} <br />
            {details.email_id}
          </Typography>
        </Box>
        <Box width="100%">
          <Typography variant="subtitle2" color="text.secondary">
            Where
          </Typography>
          <Typography variant="body1" color="primary">
            Cal Video
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookingConfirmation;
