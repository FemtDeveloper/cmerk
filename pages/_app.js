import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, yellowTheme, pinkTheme, blueTheme } from "themes";
import { UiProvider } from "context";
import { AuthProvider } from "context/auth";
import "../styles/globals.css";
import { store } from "store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <AuthProvider>
            <UiProvider>
              <ThemeProvider theme={blueTheme}>
                <Component {...pageProps} />
                <Toaster />
              </ThemeProvider>
            </UiProvider>
          </AuthProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default MyApp;
