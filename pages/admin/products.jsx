import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import AdminLayout from "@/components/admin/AdminLayout";
import { ProductToEdit } from "@/components/admin/ProductToEdit";

export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  if (!products) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

const AllProducts = ({ products = [] }) => {
  return (
    <AdminLayout>
      {!products ? (
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
          {products.map((product) => (
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
