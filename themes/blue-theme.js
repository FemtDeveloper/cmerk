import { createTheme } from "@mui/material/styles";

export const blueTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4b72ff",
    },
    secondary: {
      main: "#f2f1ed",
    },
    info: {
      main: "#FFDA23",
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
          backgroundColor: "#4b72ff",
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#4b72ff",
          fontWeight: 600,
        },
        h1: {
          fontSize: 34,
          // fontWeight: 600,
        },
        h2: {
          fontSize: 30,
          // color: "#B7990D",
          // fontWeight: 600,
        },
        h3: {
          fontSize: 28,
          color: "#FFDA23",
          fontWeight: 500,
        },
        h4: {
          fontSize: 18,
          fontWeight: 400,
        },
        h6: {
          color: "#ffffff",
          fontSize: 26,
          fontWeight: 600,
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
          color: "#EBEBEB",
          border: "solid #46464605 1px",
          fontWeight: 700,
          ":hover": {
            color: "#4b72ff",
            backgroundColor: "#f2f1ed",
            borderRadius: 10,

            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "#4b72ff",
        },
      },
    },
  },
});
