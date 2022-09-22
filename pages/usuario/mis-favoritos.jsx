import AllProducts from "@/components/AllProducts";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { FullScreenLoading } from "@/components/FullScreenLoading";
import Layout from "Layouts/Layout";

const MisFavoritos = () => {
  const { favoriteProducts } = useSelector((state) => state.user);

  return (
    <Layout
      title="C-Merk Camisetas "
      pageDescription="Mis productos favoritos Baratos en remates del madrugon"
    >
      <Typography variant="h1" sx={{ textTransform: "capitalize", mb: 2 }}>
        Mis favoritos
      </Typography>
      {favoriteProducts.length > 0 ? (
        <AllProducts products={favoriteProducts} />
      ) : (
        <FullScreenLoading />
      )}
    </Layout>
  );
};

export default MisFavoritos;
