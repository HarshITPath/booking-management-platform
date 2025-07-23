import { Theme } from "@mui/material/styles";

export const componentsStyle = (theme: Theme) => {
  return {
    MuiTypography: {
      defaultProps: {
        variantMapping: {},
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          fontFamily: "sans-serif",
        },
        outlined: {},
        sizeSmall: {
          [theme.breakpoints.up("xs")]: {
            height: 35,
            padding: "0px 10px",
          },
        },
        sizeMedium: {
          [theme.breakpoints.up("xs")]: {
            height: 40,
            minHeight: 40,
            padding: "5px 16px",
          },
        },
        sizeLarge: {
          padding: "15px 25px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem !important",
          color: "#1C1C1C",
          fontWeight: "500",
        },
        asterisk: {
          color: theme.palette.error.main,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "common.white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#1C1C1C",
          fontWeight: 500,
          ".MuiOutlinedInput-notchedOutline": {
            transition: "all 0.3s ease",
            borderColor: "common.black",
          },
          "&.MuiInputBase-colorPrimary:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.MuiInputBase-colorSecondary:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
          "&.Mui-disabled": {},
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: `${theme.palette.error.main} !important`,
          },
        },
        inputSizeSmall: {
          height: 40,
          paddingTop: 0,
          paddingBottom: 0,
        },
        input: {
          fontSize: "1rem",
          "&::placeholder": {},
        },
        notchedOutline: {},
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "#1C1C1C",
          marginBottom: "-3px",
        },
      },
    },
    // MuiDateCalendar: {
    //   styleOverrides: {
    //     root: { height: "auto" },
    //   },
    // },
  } as const;
};