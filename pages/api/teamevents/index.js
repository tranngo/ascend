import { prisma } from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, start, end, allDay, teamId } = req.body;
    const result = await prisma.teamEvent.create({
      data: {
        title: title,
        start: start,
        end: end,
        allDay: allDay,
        teamId: teamId,
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
