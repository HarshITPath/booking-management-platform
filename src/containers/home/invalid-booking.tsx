import React from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ICONS } from "@/assets/icons";

const InvalidBookingLink = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "white",
        p: 4,
        borderRadius: 2,
        maxWidth: 600,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="error" mb={2}>
        Invalid Booking Link
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={2}>
        The booking link you’ve used is not valid.
      </Typography>

      <List sx={{ textAlign: "left", color: "text.secondary", mb: 3 }}>
        {[
          "The agent code is incorrect or does not exist.",
          "The selected slot is unavailable or expired.",
          "The booking link may have been tampered with or is no longer active.",
        ].map((item, index) => (
          <ListItem key={index} disableGutters>
            <ListItemIcon sx={{ minWidth: 24 }}>
              <ICONS.CircleIcon sx={{ fontSize: 8, mt: "5px" }} />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      <Typography variant="body1" color="text.primary" fontWeight={500}>
        📩 Please contact the person or agency who shared the link with you to
        get a valid booking link.
      </Typography>
    </Paper>
  );
};

export default InvalidBookingLink;
