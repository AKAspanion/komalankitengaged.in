import { getDB } from "@/db/mongo";
import { ObjectId } from "mongodb";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Guest | ResponseError>
) {
  const db = await getDB("guests");

  switch (_req.method) {
    case "GET":
      const { query } = _req;
      const { id } = query;
      const guest = await db.collection<Guest>("guests").findOne({ _id: id });

      return guest
        ? res.status(200).json(guest)
        : res.status(404).json({ message: `Guest with id: ${id} not found.` });
  }
}
