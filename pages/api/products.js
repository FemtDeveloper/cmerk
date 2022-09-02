import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany();
    if (!products) {
      return res.status(400).json({ message: "Products no found" });
    }
    return res.status(200).json(products);
  }
  const session = await getSession({ req });

  // Check if user is authenticated

  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const { productId } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      let favorites = user.favoriteProduct;
      let newFavoritesIds = [];
      let userUpdated;
      if (favorites.includes(productId)) {
        newFavoritesIds = favorites.filter((fav) => fav !== productId);
        userUpdated = await prisma.user.update({
          where: { email: session.user.email },
          data: {
            favoriteProduct: newFavoritesIds,
          },
        });
        return res.status(200).json(userUpdated);
      }
      userUpdated = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          favoriteProduct: {
            push: productId,
          },
        },
      });
      return res.status(200).json(userUpdated);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Can not update product." });
    }
  }
  if (req.method === "POST") {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    // Create new product
    try {
      const {
        brand,
        cantidad,
        categoria,
        description,
        images,
        inStock,
        medidas,
        price,
        slug,
        title,
      } = req.body;

      const product = await prisma.product.create({
        data: {
          brand,
          cantidad,
          categoria,
          description,
          images,
          inStock,
          medidas,
          price,
          slug,
          title,
          ownerId: user.id,
        },
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
