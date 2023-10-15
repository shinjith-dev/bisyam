"use client";
import { ToastProvider } from "@/contexts/ToastContext";
import themes from "@/themes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={themes.dark}>
      <CssBaseline />
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
