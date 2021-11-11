import { prisma } from "../../../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const teamEvents = await prisma.teamEvent.findMany({
      where: {
        teamId: parseInt(id),
      },
    });

    res.status(200).json(teamEvents);
  }
}
