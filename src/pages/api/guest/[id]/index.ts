import { getDB } from "@/db/mongo";
import { isAdmin, isAuthenticated } from "@/lib/auth";
import { Guest } from "@/schema/guest";
import { ObjectId } from "mongodb";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<Guest | ResponseMessage>>
) {
  const {
    query: { id = "" },
  } = _req;
  const query = { _id: new ObjectId(id.toString()) };

  if (!(await isAuthenticated(_req))) {
    return res.status(401).json({ data: { message: `Unauthorized` } });
  }
  switch (_req.method) {
    case "GET": {
      return getGuestByID(_req)
        .then((guest) => {
          return guest
            ? res.status(200).json({ data: guest })
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
      const db = await getDB();
      const { name, phoneNo } = _req.body;

      return await db
        .collection("guests")
        .updateOne(query, { $set: { name, phoneNo } })
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
    }
    case "DELETE": {
      if (!(await isAdmin(_req))) {
        return res.status(403).json({
          data: { message: `You are not authorized to do this operation` },
        });
      }
      const {
        query: { room },
      } = _req;
      const db = await getDB();

      const promises: any[] = [db.collection("guests").deleteOne(query)];

      if (room) {
        const roomQuery = { _id: new ObjectId(room.toString()) };
        promises.push(
          db
            .collection("rooms")
            .updateOne(roomQuery, { $inc: { occupied: -1 } })
        );
      }

      return Promise.all(promises)
        .then(() => {
          return res.status(200).json({
            data: { message: `Guest with id: ${id} deleted successfully` },
          });
        })
        .catch((error) => {
          return res.status(500).json({
            data: {
              message: `Guest with id: ${id} not deleted`,
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

const getGuestByID = async (req: NextApiRequest) => {
  const {
    query: { id = "" },
  } = req;

  const query = { _id: new ObjectId(id.toString()) };

  const db = await getDB();

  return await db
    .collection("guests")
    .findOne<Guest>(query)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject({
        status: "error",
        message: error.error,
      });
    });
};

// const updateGuestByID = async (req: NextApiRequest) => {
//   const {
//     query: { id = "" },
//   } = req;
//   const query = { _id: new ObjectId(id.toString()) };

//   const db = await getDB();

//   return await db
//     .collection("guests")
//     .findOne<Guest>(query)
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       return Promise.reject({
//         status: "error",
//         message: error.error,
//       });
//     });
// };
