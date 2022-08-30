import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const SalesBar = () => {
  const { push } = useRouter();
  const navigateTo = (url) => {
    push(url);
  };
  return (
    <Grid
      container
      alignContent={"center"}
      justifyContent={"center"}
      className="sales-bar"
      sx={{ paddingX: { xs: 2, sm: 5, zIndex: 2000 } }}
    >
      <Typography variant="subtitle2" color={"whitesmoke"}>
        Encuentra productos en promocíon
      </Typography>
      <Button
        variant="outlined"
        className="sale-btn"
        onClick={() => navigateTo("/productos/promociones")}
      >
        ¡Ver más!
      </Button>
    </Grid>
  );
};
