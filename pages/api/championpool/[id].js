import { prisma } from "../../../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Get champion pool by user ID
    const championPool = await prisma.championPool.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(championPool);
  }
}
