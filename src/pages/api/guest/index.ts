import { getDB } from "@/db/mongo";
import { Guest, GuestSchema } from "@/schema/guest";
import { getErrorMessage } from "@/utils/error";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Guest[] | Guest | ResponseMessage>>
) {
  switch (_req.method) {
    case "POST": {
      try {
        const db = await getDB("guests");
        let bodyObject = _req.body;

        GuestSchema.parse(bodyObject);

        let newGuest = await db
          .collection("guests")
          .insertOne({ ...bodyObject, createdAt: new Date(Date.now()) });

        return res.status(200).json({
          data: { ...bodyObject, _id: newGuest.insertedId.toString() },
        });
      } catch (error) {
        return res.status(500).json({
          data: { message: getErrorMessage(error) },
        });
      }
    }
    case "GET": {
      const db = await getDB("guests");
      const guests = await db
        .collection("guests")
        .find<Guest>({})
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json({ data: guests });
    }
    default: {
      return res
        .status(400)
        .json({ data: { message: `Couldn't handle request` } });
    }
  }
}
