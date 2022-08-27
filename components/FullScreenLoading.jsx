import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const FullScreenLoading = (products = []) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <CircularProgress thickness={5} color="success" />
    </Box>
  );
};
