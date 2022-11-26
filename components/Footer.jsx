import PlaceIcon from "@mui/icons-material/Place";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export const Footer = () => {
  const { push } = useRouter();
  const navigateTo = (url) => {
    push(url);
  };
  return (
    <Paper
      sx={{ bottom: 0, left: 0, right: 0, height: "50px", display: "flex" }}
      elevation={1}
    >
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <ListItemIcon>
          <PlaceIcon color="primary" />
        </ListItemIcon>
        <ListItemText color="secondary">
          Dirección: Carrera 18 # 15 -12{" "}
          <Typography variant="h5"> Bucaramanga</Typography>
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
