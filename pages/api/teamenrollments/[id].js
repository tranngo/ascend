import { prisma } from "../../../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const teams = await prisma.teamEnrollment.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(teams);
  }
}
