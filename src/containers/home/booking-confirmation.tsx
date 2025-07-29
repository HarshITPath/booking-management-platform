// "use client";
// import React from "react";
// import { Box, Typography, Stack, Divider } from "@mui/material";
// import { ICONS } from "@/assets/icons";

// interface BookingConfirmationProps {
//   details: {
//     first_name: string;
//     last_name: string;
//     email_id: string;
//     phone_number: string;
//     message: string;
//     organization?: string;
//     date: string;
//     time: string;
//     name:string,
//     duration:number
//   };
// }

// const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
//   details,
// }) => {
//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         p: 4,
//         borderRadius: 2,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         maxWidth: 500,
//         mx: "auto",
//         mt: 6,
//       }}
//     >
//       <Stack spacing={3} alignItems="center">
//         <ICONS.Confirmation sx={{ color: "#4caf50", fontSize: 48 }} />
//         <Typography variant="h5" fontWeight="bold" align="center">
//           This meeting is scheduled
//         </Typography>
//         <Typography variant="body2" color="text.secondary" align="center">
//           We sent an email with a calendar invitation with the details to
//           everyone.
//         </Typography>
//         <Stack spacing={2.5} width="100%">
//           <Stack>
//             <Typography variant="subtitle1" color="text.secondary">
//               What
//             </Typography>
//             <Typography variant="body1" fontWeight="bold">
//               {details?.duration} Minutes Meeting with {details?.name}
//             </Typography>
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2" color="text.secondary">
//               When
//             </Typography>
//             <Typography variant="body1" fontWeight="bold">
//               {details.date}, {details?.time}
//             </Typography>
//           </Stack>
//           <Stack>
//             <Typography variant="subtitle2" color="text.secondary">
//               Who
//             </Typography>
//             <Typography variant="body1">
//               {details?.first_name} {details?.last_name} <br />
//               {details?.email_id}
//             </Typography>
//           </Stack>
//         </Stack>
//         {/* <Divider sx={{ height: "2px", width: "100%" }} /> */}
//       </Stack>
//     </Box>
//   );
// };

// export default BookingConfirmation;

"use client";
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  alpha,
  Fade,
  Zoom,
  keyframes,
} from "@mui/material";
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
    name: string;
    duration: number;
  };
}

// Success animation
const successPulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  details,
}) => {
  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 20px 64px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.04)",
          maxWidth: 600,
          mx: "auto",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #10b981, #06b6d4, #3b82f6)",
          },
        }}
      >
        <Stack spacing={1} alignItems="center">
          {/* Success Icon with Animation */}
          <Zoom in timeout={400} style={{ transitionDelay: "200ms" }}>
            <Box
              sx={{
                position: "relative",
                animation: `${successPulse} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: "0.3s",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: alpha("#10b981", 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "3px solid #10b981",
                    opacity: 0.3,
                    animation: `${successPulse} 2s infinite`,
                  },
                }}
              >
                <ICONS.Confirmation
                  sx={{
                    color: "#10b981",
                    fontSize: 30,
                    filter: "drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))",
                  }}
                />
              </Box>
            </Box>
          </Zoom>

          {/* Success Message */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{
                color: "#1e293b",
                background: "linear-gradient(135deg, #10b981, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Meeting Scheduled! 🎉
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#64748b",
                fontSize: { xs: "1rem", sm: "1.125rem" },
                lineHeight: 1.7,
                maxWidth: 400,
                mx: "auto",
              }}
            >
              Perfect! We've sent a calendar invitation with all the meeting
              details to your email address.
            </Typography>
          </Box>

          {/* Meeting Details Card */}
          <Box
            sx={{
              width: "100%",
              bgcolor: alpha("#f8fafc", 0.6),
              borderRadius: 3,
              p: 3,
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  Meeting Details
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="700"
                  sx={{
                    color: "common.black",
                    
                  }}
                >
                  {details?.duration} Minutes Meeting with {details?.name}
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.5 }} />

              {/* When */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha("#0000FF", 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ICONS.Calendar sx={{ color: "#0000FF", fontSize: 24 }} />
                </Box>
                <Box sx={{display:"flex", flexDirection:"column", gap:1}}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#64748b",
                      fontWeight: 600,
                      letterSpacing: "1px",
                    }}
                  >
                    Date & Time
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    sx={{
                      color: "common.black",
                    }}
                  >
                    {details.date}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="600"
                    sx={{
                      color: "primary.main",
                      fontSize: { xs: "1rem", sm: "1.125rem" },
                    }}
                  >
                    {details?.time}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ opacity: 0.3 }} />

              {/* Who */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha("#8b5cf6", 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ICONS.Person sx={{ color: "#8b5cf6", fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#64748b",
                      fontWeight: 600,
                    }}
                  >
                    Attendee
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    sx={{
                      color: "common.black",
                    }}
                  >
                    {details?.first_name} {details?.last_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      fontSize: "0.9rem",
                    }}
                  >
                    {details?.email_id}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Support Message */}
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              bgcolor: alpha("#f59e0b", 0.05),
              borderRadius: 3,
              border: "1px solid rgba(245, 158, 11, 0.15)",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#92400e",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              💡 <strong>Need to reschedule or have questions?</strong>
              <br />
              Feel free to reach out using the contact information in your
              calendar invitation.
            </Typography>
          </Box>

          {/* Decorative Elements */}
          <Box
            sx={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: alpha("#10b981", 0.03),
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              bgcolor: alpha("#3b82f6", 0.03),
              zIndex: -1,
            }}
          />
        </Stack>
      </Box>
    </Fade>
  );
};

export default BookingConfirmation;
