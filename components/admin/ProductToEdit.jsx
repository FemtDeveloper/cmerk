import { Box, Button, Typography } from "@mui/material";
import { tesloApi } from "api";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { startDeletingProduct } from "store/products";

export const ProductToEdit = ({
  images = [],
  title = "",
  slug = "",
  id = "",
}) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const onEditButton = () => {
    push(`/productos/edit/${slug}`);
  };

  const toDelete = { id, images };
  const onDeleteProduct = async (id) => {
    console.log({ id });
    dispatch(startDeletingProduct(id));
    const { data } = await tesloApi({
      url: "/edit/products",
      method: "DELETE",
      data: toDelete,
    });
    console.log(data);
  };

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
        <Button onClick={onEditButton}>Editar</Button>
        <Button
          color="error"
          sx={{ ml: 2 }}
          onClick={() => onDeleteProduct(id)}
        >
          Eliminar
        </Button>
      </Box>
    </Box>
  );
};
