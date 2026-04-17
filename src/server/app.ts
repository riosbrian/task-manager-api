import express, { type Express } from "express";
import cors from "cors";
import appRouter from "@/server/routes/app.router.js";
import { errorHandler } from "@/server/middlewares/error-handler.middleware.js";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", appRouter);
app.use(errorHandler);

export async function run(port: number) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
