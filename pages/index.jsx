import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";
import AllProducts from "@/components/AllProducts";

import { FullScreenLoading } from "@/components/FullScreenLoading";

export async function getStaticProps() {
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
    revalidate: 3600 * 24,
  };
}

export default function Home({ products = [] }) {
  // if (products.length === 0) {
  //   return <FullScreenLoading />;
  // }

  return (
    <Layout title="C-Merk Mayoristas">
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
