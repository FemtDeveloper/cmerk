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
import FacebookIcon from "@mui/icons-material/Facebook";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { UiContext } from "context";
import { useForm } from "hooks";

const formData = {
  email: "",
  password: "",
};

export const SigninModal = () => {
  const { isModalOpen, toggleSigninModal } = useContext(UiContext);

  const { email, password, onInputChange } = useForm(formData);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    // toast.loading("Redirecting...");
    // setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
    });
  };
  const onGithubSignIn = () => {
    console.log("Signing in...");
    signIn("github", {
      callbackUrl: window.location.href,
    });
  };
  const onFacebookSignIn = () => {
    console.log("Signing in...");
    signIn("facebook", {
      callbackUrl: window.location.href,
    });
  };

  useForm;

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
            <Typography variant="h2">Madrugón Mayorista</Typography>
            <Grid item textAlign={"center"} mt={2}>
              <Typography variant="h4">
                Te invita a ingresar a tu cuenta
              </Typography>
            </Grid>
          </Grid>
          <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid container>
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
                <Grid item xs={12} sm={6}>
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
                {/* <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={onGithubSignIn}
                    //   disabled={isAuthenticating}
                  >
                    <PhotoCameraOutlinedIcon />
                    <Typography sx={{ ml: 2 }}>Instagram</Typography>
                  </Button>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={onFacebookSignIn}
                    //   disabled={isAuthenticating}
                  >
                    <FacebookIcon />
                    <Typography sx={{ ml: 2 }} color="secondary">
                      Facebook
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              {/* <Grid container direction="row" justifyContent="end">
                <NextLink href="/auth/register" passHref>
                  <Link sx={{ mt: 1, color: "blue" }}>Crear una cuenta</Link>
                </NextLink>
              </Grid> */}
            </Grid>
          </form>
        </Card>
      </Fade>
    </Modal>
  );
};
