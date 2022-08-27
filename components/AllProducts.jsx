import PropTypes from "prop-types";
import CardProduct from "@/components/CardProduct";
import { Grid, Typography } from "@mui/material";

const AllProducts = ({ products = [] }) => {
  const toggleFavorite = async (id) => {
    // TODO: Add/remove product from the authenticated user's favorites
  };

  return !products ? (
    <Typography variant="h1">
      <span>No hay productos para mostrar en el momento</span>
    </Typography>
  ) : (
    <Grid container spacing={4} minHeight="72vh" mb={8}>
      {products.map((product) => (
        <CardProduct
          key={product.id}
          {...product}
          onClickFavorite={toggleFavorite}
        />
      ))}
    </Grid>
  );
};

AllProducts.propTypes = {
  products: PropTypes.array,
};

export default AllProducts;
