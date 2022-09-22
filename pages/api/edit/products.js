import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.body;
  if (req.method === "PUT") {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: product,
      });

      res.status(200).json({ updatedProduct });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Producto no actualizado" });
    }
  }
  if (req.method === "DELETE") {
    const { images, id } = req.body;
    try {
      const [fileId, extension] = images[0]
        .substring(images[0].lastIndexOf("/") + 1)
        .split(".");
      await cloudinary.uploader.destroy(fileId);
      await prisma.product.delete({
        where: { id },
      });
      return res.status(200).json({ message: "Producto Eliminado con exito" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "No se pudo borrar el prodcuto" });
    }
  }
}
