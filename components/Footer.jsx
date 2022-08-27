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
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
  );
};
