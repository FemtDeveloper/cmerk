import AllProducts from "@/components/AllProducts";
import { FullScreenLoading } from "@/components/FullScreenLoading";
import Layout from "Layouts/Layout";
import { prisma } from "@/lib/prisma";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const Lacteos = ({ products = null }) => {
  const router = useRouter();
  const categoria = products.categoria;

  if (!products) {
    return (
      <Typography variant="h1">
        No hay Productos para mostrar en este momento
      </Typography>
    );
  }

  if (router.isFallback) {
    return <FullScreenLoading />;
  }

  return (
    <Layout
      pageDescription={
        "Encuentra promociones en todo tipo de ropa de lacteos, jeans, camisas, camisetas"
      }
      title="Promoción Ropa de lacteos"
    >
      <Typography variant="h1" sx={{ textTransform: "capitalize", mb: 2 }}>
        {categoria}
      </Typography>
      {products.length > 0 ? (
        <AllProducts products={products} />
      ) : (
        <FullScreenLoading />
      )}
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  //   let genderCapitalized = gender.charAt(0).toUpperCase() + gender.slice(1);
  // Get the current product from the database

  const products = await prisma.product.findMany({
    where: { categoria: "Granos" },
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

export default Lacteos;
