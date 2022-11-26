import PlaceIcon from "@mui/icons-material/Place";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

export const Footer = () => {
  const { push } = useRouter();
  const navigateTo = (url) => {
    push(url);
  };
  return (
    <Paper
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        height: "50px",
        display: "flex",
        backgroundColor: "#e9e9e9",
      }}
      elevation={1}
    >
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <ListItemIcon>
          <PlaceIcon color="primary" />
        </ListItemIcon>
        <ListItemText color="secondary">
          Dirección: Carrera 18 # 15 -12 (Bucaramanga)
          <Typography variant="h5"> </Typography>
        </ListItemText>
      </ListItem>
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <ListItemIcon>
          <SmartphoneIcon color="primary" />
        </ListItemIcon>
        <ListItemText color="secondary">Contáctanos: 3005456780</ListItemText>
      </ListItem>
    </Paper>
  );
};
