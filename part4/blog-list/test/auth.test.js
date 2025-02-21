const { describe, test } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("Invalid users are not created", () => {
  test("Invalid user information", async () => {
    const response = await api
      .post("/api/users")
      .send({ username: null, password: null })
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(
      response._body,
      "Error creating user, please provide all required fields. The username and password must be at least 3 characters long."
    );
  });
});
