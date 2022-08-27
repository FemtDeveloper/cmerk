import { ManOutlined } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export const CategoriesNavbar = () => {
  const { push } = useRouter();
  const navigateTo = (url) => {
    push(url);
  };
  return (
    <Grid
      container
      width="100%"
      flexDirection="column"
      justifyContent={"center"}
      sx={{
        boxShadow: "0px 9px 14px -6px rgba(168,168,168,0.75)",
        paddingTop: "60px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Toolbar
        sx={{
          flexDirection: "row",
          padding: 0,
          justifyContent: "space-around",
        }}
      >
        <ListItem
          button
          sx={{ width: "70px", flexDirection: "column" }}
          onClick={() => navigateTo("/categoria/granos")}
        >
          <Image
            src="/grain.png"
            alt="Categoria granos"
            layout="fixed"
            width="50px"
            height="50px"
          />
          <ListItemText primary={"Granos"} />
        </ListItem>
        <ListItem
          button
          sx={{ width: "70px", flexDirection: "column" }}
          onClick={() => navigateTo("/categoria/lacteos")}
        >
          <Image
            src="/lacteos.png"
            alt="Categoria Lacteos"
            layout="fixed"
            width="50px"
            height="50px"
          />
          <ListItemText primary={"Lacteos"} />
        </ListItem>
        <ListItem
          button
          sx={{ width: "70px", flexDirection: "column" }}
          onClick={() => navigateTo("/categoria/carne-pollo-y-pescado")}
        >
          <Image
            src="/carnes.png"
            alt="Categoria Blusas"
            layout="fixed"
            width="50px"
            height="50px"
          />
          <ListItemText primary={"Carnes"} />
        </ListItem>
        <ListItem
          button
          sx={{ width: "70px", flexDirection: "column" }}
          onClick={() => navigateTo("/categoria/mas")}
        >
          <Image
            src="/pluspink.png"
            alt="Categoria Blusas"
            layout="fixed"
            width="50px"
            height="50px"
          />
          <ListItemText primary={"más"} color={"info"} />
        </ListItem>
      </Toolbar>
    </Grid>
  );
};
