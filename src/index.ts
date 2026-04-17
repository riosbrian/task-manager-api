import { envs } from "@/config/envs.js";
import { run } from "@/server/app.js";

(async () => await run(envs.PORT))();
