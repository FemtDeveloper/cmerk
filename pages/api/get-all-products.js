import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(404).json({ products: [] });

  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();

      res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Error en la request" });
    }
  }
}
