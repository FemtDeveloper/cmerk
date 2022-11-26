import { getSession } from "next-auth/react";
import AdminLayout from "Layouts/AdminLayout";
import ListingForm from "@/components/ListingForm";
import { Box, Typography } from "@mui/material";

import { prisma } from "@/lib/prisma";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return {
    props: { user },
  };
}

const Create = ({ user = null }) => {
  return (
    <AdminLayout title="Crea tu producto">
      <Box sx={{ padding: { sm: "30px 10px 10px" }, mt: 6 }}>
        <Typography variant="h1">Agrega el producto</Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: { xs: "20px", sm: "0" } }}
        >
          Rellena los datos para agregar tu producto
        </Typography>
        <ListingForm buttonText="Add product" redirectPath="/" />
      </Box>
    </AdminLayout>
  );
};

export default Create;
