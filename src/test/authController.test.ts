import request from "supertest";
import app from "../server";

describe("Auth Routes", () => {
  it("should return status 400 for invalid email format", async () => {
    const res = await request(app).post("/api/v1/user-register").send({
      email: "invalidemail",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should return status 400 for user email already exist", async () => {
    const res = await request(app).post("/api/v1/user-register").send({
      email: "johndoe@example.com",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should return status 400 for invalid password format", async () => {
    const res = await request(app).post("/api/v1/user-register").send({
      password: "Password",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should return status 201 register a new user successfully", async () => {
    const res = await request(app).post("/api/v1/user-register").send({
      fullName: "John Doe",
      email: "johndoe@example.com",
      password: "Password@123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("success", true);
  });

  it("should return status 404 for user not found", async () => {
    const res = await request(app)
      .post("/api/v1/user-login")
      .send({ email: "nonexistent@example.com", password: "Password@123" });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should return status 400 for invalid email and password", async () => {
    const res = await request(app)
      .post("/api/v1/user-login")
      .send({ password: "Password@1234" });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should login an existing user successfully", async () => {
    const res = await request(app)
      .post("/api/v1/user-login")
      .send({ email: "johndoe@example.com", password: "Password@123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("token");
  });
});
