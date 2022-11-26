import { useRouter } from "next/router";
import Layout from "Layouts/Layout";
import { prisma } from "@/lib/prisma";
import { Box, Card, Grid, Typography } from "@mui/material";
import { ProductSlideshow } from "@/components/ProductSlideShow";
import { FullScreenLoading } from "@/components/FullScreenLoading";

const SingleProduct = (product = null) => {
  const router = useRouter();

  const myTitle = `C-Merk ${product.title}`;

  if (router.isFallback) {
    return <FullScreenLoading />;
  }

  return (
    <Layout
      title={myTitle}
      pageDescription={product.description}
      gender={product.gender}
    >
      {!product ? (
        <FullScreenLoading />
      ) : (
        <>
          <Typography
            variant="h1"
            sx={{
              textTransform: "capitalize",
              marginBottom: 3,
              display: { xs: "flex", sm: "none" },
            }}
          >
            {product.title}
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            mt={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Grid item xs={12} sm={7}>
              <Card sx={{}}>
                <ProductSlideshow images={product.images} />
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              sx={{ flexGrow: 1, justifyContent: { sm: "center" } }}
              padding={2}
            >
              <Box
                display={"flex"}
                flexDirection="column"
                sx={{ mt: { xs: 0, sm: 5 } }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    textTransform: "capitalize",
                    mb: 3,
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  {product?.title}
                </Typography>
                <Grid
                  container
                  display={"flex"}
                  flexDirection="column"
                  sx={{ height: { sm: "300px" } }}
                  alignContent="flex-start"
                >
                  <Typography>
                    <b>
                      {" "}
                      Precio/{product.cantidad} {product.medidas} {"   "}{" "}
                    </b>{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    }).format(parseInt(product.price) ?? 0)}{" "}
                  </Typography>

                  <Typography>
                    <b>Descripción: </b>
                    {product?.description ?? ""}
                  </Typography>
                  <Typography>
                    <b> Categoría: </b> {product?.categoria}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // Get all products IDs from the database
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  // Get the current product from the database
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  if (product) {
    return {
      props: JSON.parse(JSON.stringify(product)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default SingleProduct;
