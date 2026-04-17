import express, { type Express } from "express";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Task Manager API" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
