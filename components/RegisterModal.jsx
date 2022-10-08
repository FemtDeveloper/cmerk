import { useContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { UiContext } from "context";
import { useForm } from "hooks";
import { tesloApi } from "api";
import Router, { useRouter } from "next/router";

const formData = { name: "", email: "", password: "" };

export const RegisterModal = () => {
  const { isRegisterModalOpen, toggleRegisterModal, toggleSideMenu } =
    useContext(UiContext);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  const { data: session } = useSession();

  const { email, password, name, onInputChange, formState } = useForm(formData);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await tesloApi.post("/register", formState);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage(null);
        toggleRegisterModal();
        toggleSideMenu();
      }, 2000);
      let options = { redirect: false, password, email };
      await signIn("credentials", options);
    } catch (error) {
      console.log(error);
    }
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
      open={isRegisterModalOpen}
      onClose={toggleRegisterModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isRegisterModalOpen}>
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
            <Typography variant="h1" textAlign={"center"}>
              Supermercado C-Merk
            </Typography>
            <Grid item textAlign={"center"} xs={12}>
              <Typography variant="h2" mt={2}>
                Regístrate
              </Typography>
            </Grid>
          </Grid>
          <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  required
                  fullWidth
                  type="text"
                  placeholder="Tu nombre"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                />
              </Grid>
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
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Contraseña"
                  required
                  fullWidth
                  type="password"
                  autoComplete="on"
                  placeholder="introduce tu contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid container sx={{ my: 2 }} justifyContent="center">
                {isError && (
                  <Chip
                    color="error"
                    variant="outlined"
                    label="Este correo ya existe"
                  />
                )}
                {message && (
                  <Chip color="error" variant="outlined" label={message} />
                )}
              </Grid>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" fullWidth type="submit">
                    <Typography sx={{ ml: 2 }} color="secondary">
                      Registrarse
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth onClick={onGoogleSignIn}>
                    <GoogleIcon color="secondary" />
                    <Typography sx={{ ml: 2 }} color="secondary">
                      Regístrate con Google
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Fade>
    </Modal>
  );
};
