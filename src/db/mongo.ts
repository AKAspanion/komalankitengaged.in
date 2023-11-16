import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "prod-guests";
const options = {};

let client: MongoClient;
let connection: Promise<MongoClient>;

if (!uri) {
  throw new Error("Add Mongo URI to .env.local");
} else {
  client = new MongoClient(uri, options);
  connection = client.connect();
}

export const getDB = async (db_name = dbName) => {
  if (connection) {
    const client = await connection;

    return client.db(db_name);
  } else {
    throw new Error("No connection found");
  }
};

export default connection;
