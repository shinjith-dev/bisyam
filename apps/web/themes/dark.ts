import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      100: "#0D0B14",
      200: "#242329",
      300: "#3B3A40",
      400: "#545358",
      500: "#6E6D72",
      600: "#89898C",
      light: "#89898C",
      main: "#3B3A40",
      dark: "#242329",
    },
    secondary: { main: "#6E6D72" },
    text: { primary: "#fafafa", secondary: "#89898C" },
  },
  typography: {
    fontSize: 16,
    fontFamily: "inherit",
    h1: {
      fontSize: "48px",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h2: {
      fontSize: "38px",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h3: {
      fontSize: "30px",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h4: {
      fontSize: "24px",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h5: {
      fontSize: "20px",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h6: {
      fontSize: "18px",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "18px",
      lineHeight: 1.5,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "16px",
      lineHeight: 1.5,
      fontWeight: 300,
    },
    body1: {
      fontSize: "16px",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "14px",
      lineHeight: 1.5,
    },
    caption: {
      fontSize: "12px",
      lineHeight: 1.2,
    },
    overline: { fontSize: "16px", lineHeight: 1.5 },
    button: { fontSize: "16px", fontWeight: 500 },
  },
  components: {
    MuiDivider: { styleOverrides: { root: { backgroundColor: "#3B3A40" } } },
    MuiInputBase: {
      variants: [
        {
          props: {},
          style: {
            borderRadius: "8px",
            padding: "12px 16px 4px 16px",
            backgroundColor: "#F4F4F4",
          },
        },
      ],
    },
  },
});

export default theme;
