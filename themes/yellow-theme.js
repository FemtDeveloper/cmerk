import { createTheme } from "@mui/material/styles";

export const yellowTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffec31",
    },
    secondary: {
      main: "#333",
    },
    info: {
      main: "#7600a1",
    },
    success: {
      main: "#f9f9f9",
    },
    error: {
      main: "#db1010",
    },
    background: {
      default: "#f7f7f7",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
        color: "#2c2c2c",
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#ffec31",
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#464646",
        },
        h1: {
          fontSize: 34,
          fontWeight: 600,
        },
        h2: {
          fontSize: 30,
          fontWeight: 600,
        },
        h3: {
          fontSize: 28,
          fontWeight: 500,
        },
        h4: {
          fontSize: 18,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "medium",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          // boxShadow: "initial",
          color: "#464646",
          border: "solid #46464605 1px",
          fontWeight: 700,
          ":hover": {
            color: "#ffec31",
            backgroundColor: "#34332f",
            borderRadius: 10,

            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },
  },
});
