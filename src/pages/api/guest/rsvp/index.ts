import { getDB } from "@/db/mongo";
import { isAuthenticated } from "@/lib/auth";
import { Guest } from "@/schema/guest";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Guest[] | Guest | ResponseMessage>>
) {
  if (!(await isAuthenticated(_req))) {
    return res.status(401).json({ data: { message: `Unauthorized` } });
  }

  switch (_req.method) {
    case "GET": {
      const db = await getDB();
      const guests = await db
        .collection("guests")
        .aggregate<Guest>([
          {
            $match: {
              rsvpForm: { $eq: true },
            },
          },
          { $sort: { _id: 1 } },
        ])
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
