import { Grid, ListItem, ListItemText, Toolbar } from "@mui/material";
import { useRouter } from "next/router";

const categoryList = ["Granos", "Lacteos", "Despensa", "Mas"];

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
      display={{ xs: "none", sm: "flex" }}
      sx={{
        boxShadow: "0px 9px 14px -6px rgba(168,168,168,0.75)",
        // marginTop: "30px",
        backgroundColor: "#f8f8f8",
        // display: "none",
      }}
    >
      <Toolbar
        sx={{
          flexDirection: "row",
          padding: 0,
          justifyContent: "space-around",
        }}
      >
        {categoryList.map((category) => (
          <ListItem
            button
            onClick={() => navigateTo(`/categoria/${category.toLowerCase()}`)}
            key={category}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </Toolbar>
    </Grid>
  );
};
