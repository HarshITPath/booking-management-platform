"use client";
import React from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Link,
  Grid,
} from "@mui/material";
import { Moment } from "moment";

interface DemoFormProps {
  date: Moment | null;
  time: string | null;
}

const DemoForm: React.FC<DemoFormProps> = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 4,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Box component="form" mt={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Enter Details
        </Typography>
        <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name *"
              variant="outlined"
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name *"
              variant="outlined"
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email *"
              variant="outlined"
              type="email"
              required
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Add Guests"
              variant="outlined"
              placeholder="Enter email addresses separated by commas"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company name *"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Your title *" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Are you interested in cloud hosting or self-hosting? *"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="What would you like to discuss on the call?"
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid> */}
        </Grid>

        <Typography variant="body2" color="text.secondary" mb={3}>
          By proceeding, you confirm that you have read and agree to{" "}
          <Link href="#" underline="hover">Calendly Terms of Use</Link> and{" "}
          <Link href="#" underline="hover">Privacy Notice</Link>.
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mb: 2 }}
          type="submit"
        >
          Schedule Event
        </Button>
        <Typography variant="caption" color="text.secondary">
          You will be redirected to an external site.
        </Typography>
      </Box>

      <Box mt={4} pt={2} borderTop="1px solid #e0e0e0">
        <Stack direction="row" spacing={2}>
          <Link href="#" variant="body2" underline="hover">
            Cookie settings
          </Link>
          <Link href="#" variant="body2" underline="hover">
            Report abuse
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default DemoForm;