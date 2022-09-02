import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res) {
  const { images, id } = await req.body;

  try {
    const [fileId, extension] = images[0]
      .substring(images[0].lastIndexOf("/") + 1)
      .split(".");
    await cloudinary.uploader.destroy(fileId);
    await prisma.product.update({
      where: { id },

      data: {
        images: [],
      },
    });

    res.status(200).json({ message: "Response" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Image not erased" });
  }
}
