import { prisma } from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const teamEvents = await prisma.teamEvent.findMany();
    res.status(200).json(teamEvents);
  } else if (req.method === "POST") {
    const { title, start, end, allDay } = req.body;
    const result = await prisma.teamEvent.create({
      data: {
        title: title,
        start: start,
        end: end,
        allDay: allDay,
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
