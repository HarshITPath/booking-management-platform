import React, { Fragment, ReactNode } from "react";
import {
  CircularProgress,
  IconButton,
  Button as MuiButton,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";

type VariantType = "contained" | "outlined" | "text" | "solid";
type ButtonType = "button" | "icon";

interface ButtonIconProps {
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  isNormalIcon?: boolean;
  children: ReactNode;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  color,
  isNormalIcon,
  children,
}) => {
  return (
    <Stack
      className="icon-bg"
      sx={{
        bgcolor: isNormalIcon ? "transparent" : "common.white",
        borderRadius: "50%",
        color: `${color}.main`,
        height: isNormalIcon ? "auto" : 26,
        width: isNormalIcon ? "auto" : 26,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Stack>
  );
};

interface CustomButtonProps {
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  variant?: VariantType;
  loading?: boolean;
  disabled?: boolean;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  rounded?: boolean;
  buttonType?: ButtonType;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
  normalIcon?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  [key: string]: any;
}

const Button: React.FC<CustomButtonProps> = ({
  color = "primary",
  size = "medium",
  variant = "contained",
  loading = false,
  disabled = false,
  endIcon,
  startIcon,
  rounded,
  buttonType = "button",
  ariaLabel = "default",
  sx,
  normalIcon,
  onClick,
  type = "button",
  children,
  ...props
}) => {
  const borderRadius = { small: "6px", medium: "6px", large: "6px" };

  const isButton = buttonType === "button";
  const isVariantContained = variant === "contained";
  const isVariantOutlined = variant === "outlined";
  const isVariantSolid = variant === "solid";
  const isNormalIcon = variant === "text" || normalIcon;

  return (
    <Fragment>
      {isButton ? (
        <MuiButton
          {...{ color, size, variant, disabled }}
          variant={variant === "solid" ? "contained" : variant}
          {...(startIcon && {
            startIcon: loading ? (
              <CircularProgress size={15} thickness={6} color={color} />
            ) : (
              <ButtonIcon {...{ color, isNormalIcon }}>
                {startIcon}
              </ButtonIcon>
            ),
          })}
          {...((endIcon || (!startIcon && loading)) && {
            endIcon: loading ? (
              <CircularProgress
                size={15}
                thickness={6}
                color={isVariantContained ? "info" : color}
              />
            ) : normalIcon ? (
              endIcon
            ) : (
              <ButtonIcon {...{ color, isNormalIcon }}>{endIcon}</ButtonIcon>
            ),
          })}
          {...(loading
            ? { type: "button", disableRipple: true }
            : { onClick, type })}
          sx={{
            ...(rounded && { borderRadius: borderRadius[size] }),
            ...(loading && {
              cursor: "default",
            }),
            ...sx,
          }}
          {...props}
        >
          {children}
        </MuiButton>
      ) : (
        <IconButton
          {...{ color, size, onClick, type }}
          disabled={disabled || loading}
          aria-label={ariaLabel}
          sx={{
            ...(isVariantSolid && {
              color: "common.white",
              bgcolor: `${color}.main`,
              ":hover": {
                color: "common.white",
                bgcolor: `${color}.main`,
              },
            }),
            ...(isVariantOutlined && {
              border: (theme) => `1px solid ${theme.palette[color].main}`,
            }),
            ...sx,
          }}
          {...props}
        >
          {children}
        </IconButton>
      )}
    </Fragment>
  );
};

export default Button;
