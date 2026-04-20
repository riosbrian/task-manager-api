import express, { type Express } from "express";
import cors from "cors";
import appRouter from "@/server/routes/app.router.js";
import { errorHandler } from "@/server/middlewares/error-handler.middleware.js";
import { connectMongoDB } from "./db/mongodb.connection.js";
import cookieParser from "cookie-parser";
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", appRouter);
app.use(errorHandler);

export async function run(port: number) {
  try {
    await connectMongoDB();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;

//
declare global {
  namespace Express {
    interface Request {
      data?: any;
      user?: any;
    }
  }
}
