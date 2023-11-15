import { getDB } from "@/db/mongo";
import { UserWithPassword } from "@/schema/user";
import { NextApiRequest } from "next";

export const isAuthenticated = async (req: NextApiRequest) => {
  try {
    const token = (req.headers.authorization || "").split("Bearer ")[1] || "";

    const decodedToken = Buffer.from(token, "base64").toString("ascii");

    if (decodedToken) {
      const [email, time] = decodedToken.split(":");

      const expireDate = new Date(Number(time)).getTime();
      const date = new Date().getTime();

      if (expireDate - date <= 0) {
        return false;
      }

      const db = await getDB();

      const data = await db
        .collection("users")
        .findOne<UserWithPassword>({ email });

      if (data?.email !== email) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
