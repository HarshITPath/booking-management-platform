import ContainerWrapper from "@/components/container-wrapper";
import { Box, Fade, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const MeetingInfoSkeleton = () => (
  <Box
    sx={{
      p: 3,
      bgcolor: "white",
      borderRadius: 2,
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      border: "1px solid rgba(0,0,0,0.04)",
    }}
  >
    <Skeleton
      variant="rectangular"
      height={28}
      width="85%"
      sx={{ mb: 2.5, borderRadius: 1 }}
    />
    <Stack spacing={1.5}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" height={20} width="70%" />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" height={20} width="50%" />
      </Box>
    </Stack>
    <Skeleton
      variant="rectangular"
      height={60}
      width="100%"
      sx={{ mt: 3, borderRadius: 1.5 }}
    />
  </Box>
);

const CalendarSkeleton = () => (
  <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2 }}>
    <Skeleton variant="text" height={32} width="50%" sx={{ mb: 3 }} />
    <Stack spacing={2}>
      {/* Calendar header with days of week */}
      <Grid container spacing={1}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Grid key={index} size={{ xs: 12 / 7 }}>
            <Skeleton variant="rounded" width="100%" height={48} />
          </Grid>
        ))}
      </Grid>
      {/* Calendar body with date cells */}
      {Array.from({ length: 5 }).map((_, weekIndex) => (
        <Grid container spacing={1} key={weekIndex}>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <Grid key={dayIndex} size={{ xs: 12 / 7 }}>
              <Skeleton
                variant="rounded"
                width="100%"
                height={48}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Stack>
  </Box>
);

const TimeSlotSkeleton = () => (
  <Box
    sx={{
      p: 3,
      bgcolor: "common.white",
      borderRadius: 2,
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      border: "1px solid rgba(0,0,0,0.04)",
    }}
  >
    <Skeleton
      variant="text"
      height={28}
      width="75%"
      sx={{ mb: 2.5, borderRadius: 1 }}
    />
    <Skeleton
      variant="rectangular"
      height={44}
      sx={{ mb: 3, borderRadius: 2 }}
    />
    <Stack spacing={1.5}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={52}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Stack>
    <Skeleton
      variant="rectangular"
      height={48}
      sx={{ mt: 3, borderRadius: 2 }}
    />
  </Box>
);

const BookingSkeleton = () => {
  return (
    <Stack sx={{ height: "100%", py: { xs: 3, sm: 4, md: 6 } }}>
      <ContainerWrapper>
        <Fade in timeout={300}>
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
        </Fade>
      </ContainerWrapper>
    </Stack>
  );
};

export default BookingSkeleton;
