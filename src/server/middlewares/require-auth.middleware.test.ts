import request from "supertest";
import app from "@/server/app.js";
import { authentication } from "@/server/middlewares/authentication.middleware.js";
import { errorHandler } from "@/server/middlewares/error-handler.middleware.js";
import { requireAuth } from "@/server/middlewares/require-auth.middleware.js";
import * as tokenUtils from "@/shared/utils/jwt.util.js";
import { TokenError } from "@/shared/utils/token.errors.js";

app.get("/require-auth", authentication, requireAuth, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

app.use(errorHandler);

describe("is guest middleware", () => {
  it("should pass (200) if user is logged in", async () => {
    vi.spyOn(tokenUtils, "verifyToken").mockResolvedValue({ userId: "123" });

    const response = await request(app)
      .get("/require-auth")
      .set("Cookie", ["accessToken=valid-token"]);

    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
  });

  it("should throw 401 if user is NOT logged in", async () => {
    vi.spyOn(tokenUtils, "verifyToken").mockRejectedValue(
      TokenError.tokenExpired(),
    );

    const response = await request(app)
      .get("/require-auth")
      .set("Cookie", ["accessToken=expired-token"]);

    expect(response.status).toBe(401);
    expect(response.body.message).toContain("Token expired");
  });

  it("should throw 401 if NO cookie is provided at all", async () => {
    const response = await request(app).get("/require-auth");
    expect(response.status).toBe(401);
    expect(response.body.message).toContain(
      "Access denied. Authentication required",
    );
  });
});
