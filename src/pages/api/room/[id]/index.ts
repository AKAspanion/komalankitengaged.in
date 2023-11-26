import { getDB } from "@/db/mongo";
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

  switch (_req.method) {
    case "GET": {
      if (id === "key") {
        res.status(404).json({ data: { message: `Room  not found` } });
      }

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
          .sort({ name: 1 })
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
