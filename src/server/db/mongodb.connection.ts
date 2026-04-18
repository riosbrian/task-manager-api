import mongoose from "mongoose";
import { envs } from "../../config/envs.js";

// export const connectMongoDB = async (): Promise<typeof mongoose> => {
//   const { MONGO_URL, MONGO_DB_NAME } = envs;

//   try {
//     const connection = await mongoose.connect(MONGO_URL, {
//       dbName: MONGO_DB_NAME,
//       // maxPoolSize: 10,
//       // serverSelectionTimeoutMS: 5000,
//       // socketTimeoutMS: 45000,
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   // mongoose.connection.on("connected", () => {
//   //   console.log("MongoDB connected successfully");
//   // });

//   // mongoose.connection.on("error", (err: unknown) => {
//   //   console.error("MongoDB connection error:", err as Error);
//   // });

//   // mongoose.connection.on("disconnecting", () => {
//   //   console.log("MongoDB disconnecting...");
//   // });

//   // return connection;
// };

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err: unknown) => {
  console.error("MongoDB connection error:", err as Error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected...");
});

export async function connectMongoDB() {
  const { MONGO_URL, MONGO_DB_NAME } = envs;

  if (mongoose.connection.readyState === 1) return;

  if (mongoose.connection.readyState === 2) {
    return new Promise((resolve, reject) => {
      mongoose.connection.once("connected", resolve);
      mongoose.connection.once("error", reject);
    });
  }

  await mongoose.connect(MONGO_URL, {
    dbName: MONGO_DB_NAME,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}
