import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";

const api = supertest(app);

describe("testing product controller", () => {
  test("products are returned as json", async () => {
    await api
      .get("/products")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  afterAll(() => {
    void mongoose.connection.close();
  });
});
