"use client";
import { createTheme, ThemeOptions, Theme } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
// import { componentsStyle } from "./components-style";

const defaultTheme = createTheme({
  shape: {
    borderRadius: 6,
  },
  palette,
} as ThemeOptions);

const theme: Theme = createTheme({
  ...defaultTheme,
  // components: componentsStyle(defaultTheme),
  typography: typography(defaultTheme),
});

export default theme;
