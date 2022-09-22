import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
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
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export const Footer = () => {
  const { push } = useRouter();
  const navigateTo = (url) => {
    push(url);
  };
  return (
    <Paper sx={{ bottom: 0, left: 0, right: 0, height: "50px" }} elevation={3}>
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <ListItemText color="secondary">
          Dirección: Evergreen St 90210
        </ListItemText>
        <ListItemText color="secondary">Contáctanos: 3005456780</ListItemText>
      </ListItem>

      {/* <BottomNavigation showLabels>
        <BottomNavigationAction label="Contactanos" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
      </BottomNavigation> */}
    </Paper>
  );
};
