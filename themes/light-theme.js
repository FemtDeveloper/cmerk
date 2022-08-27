import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e3e3e3",
    },
    secondary: {
      main: "#3A64D8",
    },
    info: {
      main: "#007070",
    },
    success: {
      main: "#f9f9f900",
    },
    error: {
      main: "#db1010",
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
          backgroundColor: "#c2e3ff",
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#2c2c2c",
        },
        h1: {
          fontSize: 30,
          fontWeight: 600,
          color: "#444444",
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        h3: {
          fontSize: 20,
          fontWeight: 400,
          color: "#444444",
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
        size: "large",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          color: "whitesmoke",
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 10,
          ":hover": {
            backgroundColor: "#007070",
            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#c2e3ff0d",
          },
        },
      },
    },
  },
});
