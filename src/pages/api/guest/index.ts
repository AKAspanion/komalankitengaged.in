import { getDB } from "@/db/mongo";
import { isAuthenticated } from "@/lib/auth";
import { Guest, GuestSchema } from "@/schema/guest";
import { getErrorMessage } from "@/utils/error";
import { ObjectId } from "mongodb";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Guest[] | Guest | ResponseMessage>>
) {
  if (!(await isAuthenticated(_req))) {
    return res.status(401).json({ data: { message: `Unauthorized` } });
  }

  switch (_req.method) {
    case "POST": {
      try {
        const db = await getDB();
        let bodyObject = _req.body;

        GuestSchema.parse(bodyObject);

        const room = bodyObject?.room
          ? new ObjectId(bodyObject?.room)
          : undefined;

        const promises: any[] = [
          await db.collection("guests").insertOne({
            ...bodyObject,
            room,
            createdAt: new Date(Date.now()),
          }),
        ];

        if (room) {
          const roomQuery = { _id: new ObjectId(room.toString()) };
          promises.push(
            db
              .collection("rooms")
              .updateOne(roomQuery, { $inc: { occupied: 1 } })
          );
        }

        const [newGuest] = await Promise.all(promises);

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
      const db = await getDB();
      const guests = await db
        .collection("guests")
        .aggregate<Guest>([
          {
            $lookup: {
              from: "rooms",
              localField: "room",
              foreignField: "_id",
              as: "roomData",
            },
          },
          {
            $unwind: {
              path: "$roomData",
              preserveNullAndEmptyArrays: true,
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
