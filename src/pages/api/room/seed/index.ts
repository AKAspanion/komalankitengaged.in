import { getDB } from "@/db/mongo";
import { isAuthenticated } from "@/lib/auth";
import { Room } from "@/schema/room";
import { NextApiResponse, NextApiRequest } from "next";

import { rooms } from "./rooms";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Room[] | ResponseMessage>>
) {
  if (!(await isAuthenticated(_req))) {
    return res.status(401).json({ data: { message: `Unauthorized` } });
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
