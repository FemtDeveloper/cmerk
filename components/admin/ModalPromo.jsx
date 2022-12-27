import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { miApi } from "api";
import Image from "next/image";

export const ModalPromo = ({ isOpen, setIsModalOpen, price, id, image }) => {
  const [newPrice, setNewPrice] = useState("");

  const onInputChange = (e) => {
    setNewPrice(e.target.value);
  };
  const updatingPromo = async (id) => {
    try {
      const { data } = await miApi({
        url: "/edit/add-promo",
        method: "PUT",
        data: { newPrice, id },
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "3px solid #6867fb",
          borderRadius: "10px",
          boxShadow: 24,
          p: 2,
        }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h1" textAlign={"center"} mb={2}>
          Agregar promoción
        </Typography>
        <Box textAlign={"center"}>
          <Image
            src={image}
            alt="Imagen del producto a editar"
            width={70}
            height={70}
          />
          <Typography variant="subtitle1">Precio actual: ${price}</Typography>
          <Typography
            variant="h4"
            sx={{ color: "#2d009b", fontWeight: 600, mb: 1 }}
          >
            Precio Promoción:{" "}
            <TextField
              autoFocus
              sx={{
                "& .MuiOutlinedInput-input": {
                  backgroundColor: "#F5F5F5 !important",
                  borderWidth: "2px",
                  borderColor: "blue",
                  padding: "5px",
                  textAlign: "center",
                  maxWidth: "60px",
                  fontWeight: 600,
                },
              }}
              onChange={onInputChange}
            />
          </Typography>
          <Button onClick={() => updatingPromo(id)}>Actualizar</Button>
        </Box>
      </Box>
    </Modal>
  );
};
