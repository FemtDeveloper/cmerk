import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { getProviders, signIn } from "next-auth/react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
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

const formData = {
  email: "",
  password: "",
};

export const SigninModal = () => {
  const { isModalOpen, toggleSigninModal, toggleRegisterModal } =
    useContext(UiContext);

  const { email, password, onInputChange } = useForm(formData);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
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
              {/* <Grid item xs={12} sx={{ mt: 2 }}>
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
              <Grid item xs={12} sx={{ mt: 2 }}>
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
              </Grid> */}
              <Grid
                container
                sx={{ mt: 2 }}
                // display={errorMessage ? "" : "none"}
              >
                {/* <Grid item xs={12} sx={{ mt: 2 }}>
                  <Alert severity="error">Error al ingresar</Alert>
                </Grid> */}
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {/*  <Grid item xs={12} sm={6}>
                   <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    //   disabled={isAuthenticating}
                  >
                    Login
                  </Button>
                </Grid> */}
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
                mt={2}
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
