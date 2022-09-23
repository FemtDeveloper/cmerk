import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  // Create new product
  if (req.method === "PUT") {
    try {
      const { newPrice, id } = req.body;
      const productUpdated = await prisma.product.update({
        where: { id },
        data: { pricePromo: newPrice, hasPromo: true },
      });
      return res.status(200).json(productUpdated);
    } catch (error) {
      console.log("Error adding brand to user");
      res.status(400).json({ message: "Error adding brand to user" });
    }
  }
}
