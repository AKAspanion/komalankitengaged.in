import { getDB } from "@/db/mongo";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Guest[]>
) {
  const db = await getDB("guests");

  switch (_req.method) {
    case "POST":
      let bodyObject = _req.body;
      let newGuest = await db.collection<Guest>("guests").insertOne(bodyObject);

      return res
        .status(200)
        .json([{ ...bodyObject, _id: newGuest.insertedId.toString() }]);
    case "GET":
      const guests = await db.collection<Guest>("guests").find({}).toArray();
      return res.status(200).json(guests);
  }
}
