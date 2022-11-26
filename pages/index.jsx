import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import Layout from "Layouts/Layout";
import { prisma } from "@/lib/prisma";
import AllProducts from "@/components/AllProducts";
import { FullScreenLoading } from "@/components/FullScreenLoading";

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

export default function Home({ products = [] }) {
  if (products.length === 0) {
    return <FullScreenLoading />;
  }

  return (
    <Layout title="C-Merca">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Los mejores precios en tu mercado
      </Typography>

      <Grid container marginTop={6}>
        <AllProducts products={products} />
      </Grid>
    </Layout>
  );
}
