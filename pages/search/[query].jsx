import AllProducts from "@/components/AllProducts";
import { prisma } from "@/lib/prisma";
import { Box, Typography } from "@mui/material";
import Layout from "Layouts/Layout";

const SearchPage = ({ products, query, foundProducts }) => {
  return (
    <Layout
      title={"Busqueda - Madrugon Mayorista"}
      pageDescription={"Promociones del Madrugón en Bogotá"}
    >
      <Typography variant="h1" component="h1">
        Busqueda de productos
      </Typography>
      {foundProducts ? (
        <Typography variant="h4" textTransform="capitalize" mb={2}>
          Termino de búsqueda: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            {" "}
            No encontramos ningun producto:
          </Typography>
          <Typography
            variant="h2"
            sx={{ ml: 1 }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}

      <AllProducts products={products} />
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps = async ({ params }) => {
  const { query = "" } = params;

  let products = await prisma.product.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  const foundProducts = products.length > 0;
  if (!foundProducts) {
    products = await prisma.product.findMany();
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      query,
      foundProducts,
    },
  };
};
