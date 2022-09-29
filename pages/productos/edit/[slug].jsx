import { getSession } from "next-auth/react";
import AdminLayout from "Layouts/AdminLayout";
import { Box, Typography } from "@mui/material";

import { prisma } from "@/lib/prisma";
import EditingForm from "@/components/EditingForm";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { params } = context;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const product = await prisma.product.findFirst({
    where: { slug: params.slug },
  });
  const myProduct = await JSON.parse(JSON.stringify(product));

  return {
    props: myProduct,
  };
}

const Edit = (product = null) => {
  return (
    <AdminLayout title="Edita tu producto">
      <Box sx={{ padding: { sm: "30px 10px 10px" }, mt: 6 }}>
        <Typography variant="h1">Editar producto</Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: { xs: "20px", sm: "0" } }}
        >
          Actializa los datos de tu producto
        </Typography>
        <EditingForm
          buttonText="Add product"
          redirectPath="/"
          product={product}
        />
      </Box>
    </AdminLayout>
  );
};

export default Edit;
