import { useContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  Fade,
  Grid,
  Link,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { UiContext } from "context";
import { useForm } from "hooks";
import { Router } from "react-router-dom";
import { useRouter } from "next/router";

const formData = {
  email: "",
  password: "",
};

export const SigninModal = () => {
  const {
    isModalOpen,
    toggleSigninModal,
    toggleRegisterModal,
    toggleSideMenu,
  } = useContext(UiContext);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const { email, password, onInputChange, formState } = useForm(formData);

  const { data: session } = useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    let options = { redirect: false, password, email };
    const res = await signIn("credentials", options);
    setMessage(null);
    setTimeout(() => {
      if (!res.error) {
        toggleSigninModal();
        toggleSideMenu();
      }
    }, 1500);
    if (res?.error) {
      setMessage(res.error);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      console.log(res.error);
    }
  };

  const openRegisterModal = (e) => {
    e.preventDefault();
    toggleSigninModal();
    toggleRegisterModal();
  };

  const onGoogleSignIn = () => {
    // toast.loading("Redirecting...");
    // setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModalOpen}
      onClose={toggleSigninModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModalOpen}>
        <Card
          xs={10}
          sx={{
            position: "absolute",
            backgroundColor: "#fff",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: { xs: "80%", sm: "60%" },
          }}
        >
          <Grid container justifyContent={"center"}>
            <Typography variant="h2" textAlign={"center"}>
              Supermercado C-Merk
            </Typography>
            <Grid item textAlign={"center"} xs={12}>
              <Typography variant="h4" mt={2}>
                Te invita a ingresar a tu cuenta
              </Typography>
            </Grid>
          </Grid>
          <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid container justifyContent={"flex-end"}>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Email"
                  required
                  fullWidth
                  type="email"
                  placeholder="coreo@dominio.com"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ my: 2 }}>
                <TextField
                  label="Comtraseña"
                  required
                  fullWidth
                  type="password"
                  placeholder="introduce tu contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                justifyItems={"center"}
                flexDirection="column"
              >
                {message && (
                  <Chip
                    color="error"
                    variant="outlined"
                    label={message}
                    sx={{ mb: 2 }}
                  />
                )}
                <Button variant="contained" fullWidth type="submit">
                  <Typography sx={{ ml: 2 }} color="secondary">
                    Ingresar
                  </Typography>
                </Button>
              </Grid>
              <Grid
                container
                sx={{ mt: 2 }}
                // display={errorMessage ? "" : "none"}
              >
                {/* <Grid item xs={12} sx={{ mt: 2 }}>
                  <Alert severity="error">Error al ingresar</Alert>
                </Grid> */}
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={onGoogleSignIn}
                    //   disabled={isAuthenticating}
                  >
                    <GoogleIcon />
                    <Typography sx={{ ml: 2 }} color="secondary">
                      Google
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Box
                component="span"
                mt={1}
                onClick={openRegisterModal}
                sx={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                ¿No tienes cuenta?
              </Box>
            </Grid>
          </form>
        </Card>
      </Fade>
    </Modal>
  );
};
