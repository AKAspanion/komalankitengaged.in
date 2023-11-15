import { getDB } from "@/db/mongo";
import { isAuthenticated } from "@/lib/auth";
import { Room } from "@/schema/room";
import { ObjectId } from "mongodb";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Room[] | ResponseMessage>>
) {
  const {
    query: { id = "" },
  } = _req;
  const query = { _id: new ObjectId(id.toString()) };

  if (!(await isAuthenticated(_req))) {
    return res.status(401).json({ data: { message: `Unauthorized` } });
  }

  switch (_req.method) {
    case "PUT": {
      const db = await getDB();
      let bodyObject = _req.body;
      const roomId = bodyObject.room;

      if (!roomId) {
        return res.status(400).json({
          data: { message: `Room id is required` },
        });
      }

      const room = new ObjectId(roomId);

      db.collection("guests")
        .updateOne(query, { $set: { room } })
        .then(() => {
          return res.status(200).json({
            data: { message: `Guest with id: ${id} updated successfully` },
          });
        })
        .catch((error) => {
          return res.status(500).json({
            data: {
              message: `Guest with id: ${id} not updated`,
              error: error.toString(),
            },
          });
        });
      return res
        .status(200)
        .json({ data: { message: `Room updated successfully` } });
    }
    default: {
      return res
        .status(400)
        .json({ data: { message: `Couldn't handle request` } });
    }
  }
}
