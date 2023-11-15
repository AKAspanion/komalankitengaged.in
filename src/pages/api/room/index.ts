import { getDB } from "@/db/mongo";
import { isAuthenticated } from "@/lib/auth";
import { Room } from "@/schema/room";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Room[] | ResponseMessage>>
) {
  if (!(await isAuthenticated(_req))) {
    return res.status(401).json({ data: { message: `Unauthorized` } });
  }

  switch (_req.method) {
    case "GET": {
      const db = await getDB("guests");
      const rroms = await db
        .collection("rooms")
        .find<Room>({})
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json({ data: rroms });
    }
    default: {
      return res
        .status(400)
        .json({ data: { message: `Couldn't handle request` } });
    }
  }
}
