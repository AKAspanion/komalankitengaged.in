import { ObjectId } from "mongodb";
import { NextApiResponse, NextApiRequest } from "next";
import { getGuestByID } from "../index";
import { Guest, RSVPType } from "@/schema/guest";
import { getDB } from "@/db/mongo";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<RSVPType | ResponseMessage>>
) {
  const {
    query: { id = "" },
  } = _req;
  const query = { _id: new ObjectId(id.toString()) };

  switch (_req.method) {
    case "GET": {
      return getGuestByID(_req)
        .then((guest) => {
          return guest
            ? res.status(200).json({ data: guest?.rsvp })
            : res.status(404).json({
                data: { message: `Guest with id: ${id} not found` },
              });
        })
        .catch((error) => {
          return res.status(500).json({
            data: {
              message: `Error in fetching guest`,
              error: error.toString(),
            },
          });
        });
    }
    case "PUT": {
      let bodyObject = _req.body;
      const rsvp = bodyObject.rsvp;

      const db = await getDB();

      const promises = [
        db.collection("guests").updateOne(query, { $set: { rsvp } }),
      ];

      return Promise.all(promises)
        .then(() => {
          return res.status(200).json({
            data: { message: `RSVP set successfully` },
          });
        })
        .catch((error) => {
          return res.status(500).json({
            data: {
              message: `Error in fetching guest`,
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
