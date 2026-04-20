import request from "supertest";
import app from "@/server/app.js";
import { authentication } from "@/server/middlewares/authentication.middleware.js";
import { errorHandler } from "@/server/middlewares/error-handler.middleware.js";
import { isGuest } from "@/server/middlewares/is-guest.middleware.js";
import * as tokenUtils from "@/shared/utils/jwt.util.js";

app.get("/is-guest", authentication, isGuest, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

app.use(errorHandler);

describe("is guest middleware", () => {
  it("should pass (200) if user is NOT logged in", async () => {
    const response = await request(app).get("/is-guest");
    expect(response.status).toBe(200);
    expect(response.body.user).toBeUndefined();
  });

  it("should throw 400 if user is ALREADY logged in", async () => {
    vi.spyOn(tokenUtils, "verifyToken").mockResolvedValue({ id: "123" });

    const response = await request(app)
      .get("/is-guest")
      .set("Cookie", ["accessToken=valid-token"]);

    expect(response.status).toBe(400);
  });
});
