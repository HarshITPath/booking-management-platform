import { Theme, TypographyVariantsOptions } from "@mui/material/styles";
// import { TypographyVariantsOptions } from "@mui/material/styles";
// import { CSSProperties } from "@mui/material/styles";

// export interface CustomTypographyOptions extends TypographyVariantsOptions {
//   body3?: CSSProperties;
//   body4?: CSSProperties;
// }

export const typography = (theme: Theme): TypographyVariantsOptions => {
  return {
    fontFamily: [
      // "Catamaran",
      // "Catamaran Fallback",
      // "League Spartan",
      // "League Spartan Fallback",
      // "ProductSans",
      // "ProductSans Fallback",
      "sans-serif",
    ].join(","),

    allVariants: {
      overflowWrap: "break-word" as const,
    },

    h1: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.75rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.5rem",
      },
    },

    h2: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.75rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.5rem",
      },
    },

    h3: {},
    h4: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.9rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.125rem",
      },
    },
    h5: {},
    h6: {},
    body1: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.125rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.125rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
      },
    },
    body2: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.125rem",
      },
    },
    subtitle1: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "0.875rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "0.875rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1rem",
      },
    },
    subtitle2: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "0.75rem", //12px
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "0.75rem", //12px
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "0.875rem", //14px
      },
    },
  };
};
