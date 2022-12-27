import AllProducts from "@/components/AllProducts";
import { FullScreenLoading } from "@/components/FullScreenLoading";
import Layout from "Layouts/Layout";
import { prisma } from "@/lib/prisma";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const GenderPage = ({ products = null }) => {
  const router = useRouter();

  if (!products) {
    return (
      <Typography variant="h1">
        No hay Productos para mostrar en este momento
      </Typography>
    );
  }

  return (
    <Layout
      pageDescription={
        "Encuentra promociones en todo tipo  de lacteos, jeans, camisas, camisetas"
      }
      title="Promoción Ropa de lacteos"
    >
      <Typography variant="h1" sx={{ textTransform: "capitalize", mb: 2 }}>
        {/* {products[0].brand} */}
      </Typography>
      {products.length > 0 ? (
        <AllProducts products={products} />
      ) : (
        <FullScreenLoading />
      )}
    </Layout>
  );
};
// export async function getStaticPaths() {
//   // Get all products IDs from the database
//   const products = await prisma.product.findMany({
//     select: { brand: true },
//   });

//   return {
//     paths: products.map((product) => ({
//       params: { brand: product.brand },
//     })),
//     fallback: true,
//   };
// }

export async function getServerSideProps({ params }) {
  const brand = params.brand;

  //   let genderCapitalized = gender.charAt(0).toUpperCase() + gender.slice(1);
  // Get the current product from the database

  const products = await prisma.product.findMany({
    where: { brand },
  });

  console.log({ products });
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

export default GenderPage;
