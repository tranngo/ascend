import { prisma } from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, name } = req.body;
    const result = await prisma.team.create({
      data: {
        name: name,
        users: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
