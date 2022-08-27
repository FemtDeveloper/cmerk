import { ListItem, ListItemText } from "@mui/material";
import Image from "next/image";
import React from "react";

export const ImageIconCategories = () => {
  return (
    <ListItem
      button
      sx={{ width: "70px", flexDirection: "column" }}
      onClick={() => navigateTo("/categoria/granos")}
    >
      hola
      {/* <Image
        src="/pants.png"
        alt="Categoria granos"
        layout="fixed"
        width="25px"
        height="25px"
      /> */}
      <ListItemText primary={"granos"} />
    </ListItem>
  );
};
