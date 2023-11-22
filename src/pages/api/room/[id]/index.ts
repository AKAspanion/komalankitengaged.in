import { getDB } from "@/db/mongo";
import { isAuthenticated } from "@/lib/auth";
import { Guest } from "@/schema/guest";
import { CompleteRoom, Room } from "@/schema/room";
import { ObjectId } from "mongodb";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Room | ResponseMessage>>
) {
  const {
    query: { id = "" },
  } = _req;

  if (!(await isAuthenticated(_req))) {
    return res.status(401).json({ data: { message: `Unauthorized` } });
  }
  switch (_req.method) {
    case "GET": {
      return getRoomByID(_req)
        .then((room) => {
          return room
            ? res.status(200).json({ data: room })
            : res.status(404).json({
                data: { message: `Room with id: ${id} not found` },
              });
        })
        .catch((error) => {
          return res.status(500).json({
            data: {
              message: `Error in fetching room`,
              error: error.toString(),
            },
          });
        });
    }
    default: {
      return res
        .status(400)
        .json({ data: { message: `Couldn't handle request` } });
    }
  }
}

const getRoomByID = async (req: NextApiRequest) => {
  const {
    query: { id = "" },
  } = req;

  const query = { _id: new ObjectId(id.toString()) };

  const db = await getDB();

  return await db
    .collection("rooms")
    .findOne<CompleteRoom>(query)
    .then(async (data) => {
      if (data) {
        const guests = await db
          .collection("guests")
          .find<Guest>({ room: new ObjectId(data?._id) })
          .sort({ createdAt: -1 })
          .toArray();

        data.guests = guests;
      }

      return data;
    })
    .catch((error) => {
      return Promise.reject({
        status: "error",
        message: error.error,
      });
    });
};
