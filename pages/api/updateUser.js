import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  // Create new product
  if (req.method === "POST") {
    try {
      const { brand, phoneNumber } = req.body;
      const userUpdate = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          brand,
          phoneNumber,
        },
      });
      return res.status(200).json(userUpdate);
    } catch (error) {
      console.log("Error adding brand to user");
      res.status(400).json({ message: "Error adding brand to user" });
    }
  }
}
