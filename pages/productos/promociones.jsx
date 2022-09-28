import Layout from "Layouts/Layout";
import { prisma } from "@/lib/prisma";
import CardProduct from "@/components/CardProduct";
import { Grid } from "@mui/material";

export async function getStaticProps() {
  //   let genderCapitalized = gender.charAt(0).toUpperCase() + gender.slice(1);
  // Get the current product from the database

  const products = await prisma.product.findMany({
    where: { hasPromo: true },
  });
  if (!products) {
    return {
      notFound: true,
    };
  }

  if (products) {
    return {
      props: { products: JSON.parse(JSON.stringify(products)) },
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

const Promociones = ({ products }) => {
  return (
    <Layout title="Promociones">
      <Grid container spacing={4} minHeight="72vh" mb={8}>
        {products.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </Grid>
    </Layout>
  );
};

export default Promociones;
