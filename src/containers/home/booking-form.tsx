// "use client";
// import React from "react";
// import { Box, Button, Grid, Stack } from "@mui/material";
// import { Form } from "@/components/form";
// import Input from "@/components/inputs";
 
// interface BookingFormProps {
//   bookingFormFields: any[];
//   methods: any;
//   onSubmit: any;
//   loading: boolean;
//   selectedDate: any;
//   selectedSlot: any;
// }
 
// const BookingForm: React.FC<BookingFormProps> = ({ bookingFormFields, methods, onSubmit, loading }) => {
//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         p: 4,
//         borderRadius: 2,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       }}
//     >
//       <Form {...{ methods, onSubmit }}>
//         <Stack sx={{gap:2}}>
//           <Grid container spacing={{ xs: 2 }}>
//             {bookingFormFields?.map(({ id, gridProps, ...rest }) => {
//               return (
//                 <Grid key={id} {...gridProps}>
//                   <Input {...rest} />
//                 </Grid>
//               );
//             })}
//           </Grid>
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ alignSelf: "start" }}
//             {...{ loading }}
//           >
//             Submit
//           </Button>
//         </Stack>
//       </Form>
//     </Box>
//   );
// };
 
// export default BookingForm;


"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  alpha,
  Fade,
} from "@mui/material";
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
 
const BookingForm: React.FC<BookingFormProps> = ({
  bookingFormFields,
  methods,
  onSubmit,
  loading,
}) => {
  return (
    <Fade in timeout={500}>
      <Stack
        spacing={2}
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.04)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #f59e0b, #ef4444, #ec4899)",
          },
        }}
      >
        {/* Header */}
        <Box>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              color: "common.black",
            }}
          >
            Complete Your Booking
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
            }}
          >
            Please fill in your details to confirm the meeting appointment.
          </Typography>
        </Box>
 
        <Form {...{ methods, onSubmit }}>
          <Stack spacing={2}>
            {/* Form Fields Grid */}
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {bookingFormFields?.map(({ id, gridProps, ...rest }, index) => {
                return (
                  <Grid key={id} {...gridProps}>
                    <Input
                      {...rest}
                      sx={{
                        height: !rest.multiline ? "56px" : "",
                        "& .MuiInputBase-input": {
                          py: !rest.multiline ? 1 : "",
                          "&::placeholder": {
                            color: "#94a3b8",
                            opacity: 1,
                          },
                        },
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
 
            {/* Enhanced Submit Button */}
            <Box
              sx={{
                animation: `slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: `${
                  (bookingFormFields?.length || 0) * 0.1 + 0.2
                }s`,
                opacity: 0,
                "@keyframes slideInUp": {
                  from: {
                    transform: "translateY(30px)",
                    opacity: 0,
                  },
                  to: {
                    transform: "translateY(0)",
                    opacity: 1,
                  },
                },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: "common.black",
                  color: "common.white",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "2px solid #94a3b8",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        "@keyframes spin": {
                          "0%": { transform: "rotate(0deg)" },
                          "100%": { transform: "rotate(360deg)" },
                        },
                      }}
                    />
                    Processing...
                  </Box>
                ) : (
                  "Confirm Booking →"
                )}
              </Button>
            </Box>
 
            {/* Additional Info */}
            <Box
              sx={{
                mt: 3,
                p: 3,
                bgcolor: alpha("#3b82f6", 0.05),
                borderRadius: 3,
                border: "1px solid rgba(59, 130, 246, 0.1)",
                animation: `slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: `${
                  (bookingFormFields?.length || 0) * 0.1 + 0.4
                }s`,
                opacity: 0,
                "@keyframes slideInUp": {
                  from: {
                    transform: "translateY(30px)",
                    opacity: 0,
                  },
                  to: {
                    transform: "translateY(0)",
                    opacity: 1,
                  },
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#475569",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                📧 A calendar invitation will be sent to your email address
                after confirmation. You can reschedule or cancel anytime if
                needed.
              </Typography>
            </Box>
          </Stack>
        </Form>
      </Stack>
    </Fade>
  );
};
 
export default BookingForm;