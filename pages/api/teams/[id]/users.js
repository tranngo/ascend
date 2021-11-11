import { prisma } from "../../../../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      where: {
        teams: {
          some: {
            teamId: parseInt(id),
          },
        },
      },
    });

    res.status(200).json(users);
  }
}
