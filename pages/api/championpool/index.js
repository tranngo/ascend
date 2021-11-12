import { prisma } from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { championId, proficiencyLevel, userId } = req.body;
    const result = await prisma.championPool.create({
      data: {
        championId: championId,
        proficiencyLevel: proficiencyLevel,
        userId: userId,
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
