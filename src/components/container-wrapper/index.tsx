import React, { ReactNode } from "react";
import { Container, ContainerProps } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

interface ContainerWrapperProps extends ContainerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

function ContainerWrapper({
  maxWidth = "xl",
  sx,
  children,
  ...props
}: ContainerWrapperProps) {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: {
          xs: "16px !important",
          md: "20px !important",
          lg: "35px !important",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Container>
  );
}

export default ContainerWrapper;
