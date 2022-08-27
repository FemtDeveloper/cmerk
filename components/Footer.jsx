import { ManOutlined } from "@mui/icons-material";
import {
  AppBar,
  BottomNavigation,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
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
    // <BottomNavigation>
    <Grid
      container
      width="100%"
      justifyContent={"space-around"}
      // position="fixed"
      sx={{
        backgroundColor: "#DDF0FF",
        color: "white",
      }}
    >
      <ListItem
        button
        sx={{ width: "70px", flexDirection: "column", color: "white" }}
        onClick={() => navigateTo("/categoria/granos")}
      >
        {/* <Image
          src="/pants.png"
          alt="Categoria granos"
          layout="fixed"
          width="25px"
          height="25px"
        /> */}
        <ListItemText primary={"Objetivos"} sx={{ color: "white" }} />
      </ListItem>
      <ListItem
        button
        sx={{ width: "70px", flexDirection: "column" }}
        onClick={() => navigateTo("/categoria/camisetas")}
      >
        {/* <Image
          src="/t-shirts.png"
          alt="Categoria granos"
          layout="fixed"
          width="25px"
          height="25px"
        /> */}
        <ListItemText primary={"Nosotros"} />
      </ListItem>
      <ListItem
        button
        sx={{ width: "70px", flexDirection: "column" }}
        onClick={() => navigateTo("/categoria/blusas")}
      >
        {/* <Image
          src="/blouses.png"
          alt="Categoria Blusas"
          layout="fixed"
          width="25px"
          height="25px"
        /> */}
        <ListItemText primary={"Ubicación"} />
      </ListItem>
      <ListItem
        button
        sx={{ width: "70px", flexDirection: "column" }}
        onClick={() => navigateTo("/categoria/mas")}
      >
        {/* <Image
          src="/plus.png"
          alt="Categoria Blusas"
          layout="fixed"
          width="25px"
          height="25px"
        /> */}
        <ListItemText primary={"Contacto"} />
      </ListItem>
    </Grid>
    // </BottomNavigation>
  );
};
