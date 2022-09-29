/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
const bcrypt = require("bcrypt");

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });
    const hash = await bcrypt.hash(password, 0);
    if (user) {
      return res.status(400).json({ message: "Este correo ya existe" });
    }
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });

      return res.status(200).json({ message: "Usuario creado con exito" });
    } catch (err) {
      console.log(err);
      return res.status(503).json({ message: "erro al crear" });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
};
