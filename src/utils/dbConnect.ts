import mongoose from "mongoose";

// Directly include the MongoDB connection string
const MONGO_URI =
  "mongodb+srv://aadinathexpress03:o2proCvSiGQlxRKc@spin-the-wheel.rnhhk.mongodb.net/?retryWrites=true&w=majority&appName=spin-the-wheel";

if (!MONGO_URI) {
  throw new Error("The MongoDB connection string is not defined.");
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Extend the global object to include a mongoose property
const globalWithMongoose = global as typeof globalThis & GlobalWithMongoose;

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;