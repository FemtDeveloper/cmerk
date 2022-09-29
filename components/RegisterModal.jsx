import { useContext } from "react";
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

const formData = { name: "", email: "", password: "" };

export const RegisterModal = () => {
  const { isRegisterModalOpen, toggleRegisterModal } = useContext(UiContext);

  const { email, password, name, onInputChange, formState } = useForm(formData);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ formState });
    // dispatch(startLoginWithEmailPassword({ email, password }));
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
              <Grid container sx={{ mt: 2 }}>
                {/* <Grid item xs={12} sx={{ mt: 2 }}>
                  <Alert severity="error">Error al ingresar</Alert>
                </Grid> */}
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
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={onGoogleSignIn}
                  >
                    <GoogleIcon />
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
