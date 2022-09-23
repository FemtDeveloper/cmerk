import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import AdminLayout from "Layouts/AdminLayout";
import { ProductToEdit } from "@/components/admin/ProductToEdit";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <AdminLayout>
      {!allProducts ? (
        <Typography variant="h1">
          <span>No hay productos para mostrar en el momento</span>
        </Typography>
      ) : (
        <Grid
          container
          spacing={4}
          minHeight="72vh"
          mb={8}
          mt={8}
          justifyContent="center"
        >
          {allProducts.map((product) => (
            <ProductToEdit key={product.id} {...product} />
          ))}
        </Grid>
      )}
    </AdminLayout>
  );
};

AllProducts.propTypes = {
  products: PropTypes.array,
};

export default AllProducts;
