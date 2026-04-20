import request from "supertest";
import app from "@/server/app.js";
import { authentication } from "@/server/middlewares/authentication.middleware.js";
import * as tokenUtils from "@/shared/utils/jwt.util.js";
import { TokenError } from "@/shared/utils/token.errors.js";
import { errorHandler } from "@/server/middlewares/error-handler.middleware.js";

app.get("/auth-middleware", authentication, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

app.use(errorHandler);

describe("Authenticate middleware", () => {
  it("should pass without user if no cookie is present", async () => {
    const response = await request(app).get("/auth-middleware");

    expect(response.status).toBe(200);
    expect(response.body.user).toBeUndefined();
  });

  it("should set req.user if token is valid", async () => {
    const mockPayload = { userId: "1234" };
    vi.spyOn(tokenUtils, "verifyToken").mockResolvedValue(mockPayload);

    const response = await request(app)
      .get("/auth-middleware")
      .set("Cookie", ["accessToken=valid-token"]);

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual(mockPayload);
  });

  it("should throw if token is invalid", async () => {
    vi.spyOn(tokenUtils, "verifyToken").mockRejectedValue(
      TokenError.invalidToken(),
    );

    const response = await request(app)
      .get("/auth-middleware")
      .set("Cookie", ["accessToken=invalid-token"]);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      status: "fail",
      message: expect.stringContaining("Invalid"),
    });
  });

  it("should throw if token is expired", async () => {
    vi.spyOn(tokenUtils, "verifyToken").mockRejectedValue(
      TokenError.tokenExpired(),
    );

    const response = await request(app)
      .get("/auth-middleware")
      .set("Cookie", ["accessToken=expired-token"]);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      status: "fail",
      message: expect.stringContaining("expired"),
    });
  });
});
