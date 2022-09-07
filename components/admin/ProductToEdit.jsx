import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const ProductToEdit = ({ images = [], title = "" }) => {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      width="90%"
      paddingX={5}
      paddingY={1}
      sx={{
        border: "0.5px solid #c3c3f5",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Image src={images[0]} height={100} width={100} alt={title} />
      <Typography variant="body1" flex={1}>
        {title}
      </Typography>
      <Box>
        <Button>Editar</Button>
        <Button color="error" sx={{ ml: 2 }}>
          Eliminar
        </Button>
      </Box>
    </Box>
  );
};
