import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(404).json({ products: [] });

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      const favoriteProductsIds = user.favoriteProduct;
      const favoriteProducts = await prisma.product.findMany({
        where: {
          id: { in: favoriteProductsIds },
        },
      });

      res.status(200).json({
        favoriteProducts,
        phoneNumber: user.phoneNumber,
        role: user.role,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Error en la request" });
    }
  }
}
