import { getDB } from "@/db/mongo";
import { Room } from "@/schema/room";
import { NextApiResponse, NextApiRequest } from "next";

import { rooms } from "./rooms";

const notAllowed = true;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Room[] | ResponseMessage>>
) {
  if (notAllowed) {
    return res.status(403).json({ data: { message: `Not allowed` } });
  }

  switch (_req.method) {
    case "POST": {
      const { dbName, collection } = _req.body;
      if (!dbName || !collection) {
        return res
          .status(400)
          .json({ data: { message: `Please provide proper input` } });
      }
      const db = await getDB(dbName);
      await db.collection(collection).insertMany(rooms.data);
      return res.status(200).json({ data: { message: "Operation done" } });
    }
    default: {
      return res
        .status(400)
        .json({ data: { message: `Couldn't handle request` } });
    }
  }
}
