import "server-only";
import { MongoClient } from "mongodb";
import { getDatabaseEnv } from "@/lib/env/server";

const runtime = globalThis as typeof globalThis & {
  offhourMongo?: Promise<MongoClient>;
};

export async function getDatabase() {
  const env = getDatabaseEnv();
  if (!env.MONGODB_URI)
    throw new Error(
      "MongoDB is not configured. Set MONGODB_URI before using database services.",
    );
  if (!runtime.offhourMongo) {
    runtime.offhourMongo = new MongoClient(env.MONGODB_URI, {
      maxPoolSize: 5,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
    })
      .connect()
      .catch((error: unknown) => {
        runtime.offhourMongo = undefined;
        throw error;
      });
  }
  return (await runtime.offhourMongo).db(env.MONGODB_DB);
}
