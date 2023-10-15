"use client";
import themes from "@/themes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={themes.dark}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
