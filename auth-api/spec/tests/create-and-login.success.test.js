const setup = require("./setup");
const teardown = require("./teardown");

const user = { username: "user" };
let app;
let knex;

describe("Create user and login", () => {
  beforeAll(async () => {
    ({ app, knex } = await setup());
  });

  afterAll(() => teardown(knex));

  describe("create user", () => {
    it("should succeed if given unique username", async () => {
      const res = await app
        .post("/users")
        .set("content-type", "application/json")
        .send({ user: { ...user, password: "pass" } });
      expect(res.status).toEqual(201);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toEqual({
        user: { ...user, id: 1, token: expect.stringMatching(/^eyJ/) },
      });
    });

    it("should fail if given duplicate username", async () => {
      const res = await app
        .post("/users")
        .set("content-type", "application/json")
        .send({ user: { ...user, password: "pass" } });
      expect(res.status).toEqual(409);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toEqual({
        errors: [
          {
            type: "ER_DUPLICATE",
            location: "body",
            resource: "user",
            property: "username",
            value: "user",
          },
        ],
      });
    });
  });

  describe("login", () => {
    it("should successfully login when given correct password", async () => {
      const res = await app
        .post("/sessions")
        .set("content-type", "application/json")
        .send({ session: { ...user, password: "pass" } });
      expect(res.status).toEqual(200);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toEqual({
        session: { ...user, userId: 1, token: expect.stringMatching(/^eyJ/) },
      });
    });

    it("should fail if user doesn't exist", async () => {
      const res = await app
        .post("/sessions")
        .set("content-type", "application/json")
        .send({ session: { username: "incorrect", password: "pass" } });
      expect(res.status).toEqual(401);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toEqual({
        errors: [
          {
            type: "ER_NOT_FOUND",
            location: "body",
            resource: "session",
            property: "username",
            value: "incorrect",
          },
        ],
      });
    });

    it("should fail to login when given incorrect password", async () => {
      const res = await app
        .post("/sessions")
        .set("content-type", "application/json")
        .send({ session: { ...user, password: "incorrect" } });
      expect(res.status).toEqual(401);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toEqual({
        errors: [
          {
            type: "ER_NOT_FOUND",
            location: "body",
            resource: "session",
            property: "password",
            value: "incorrect",
          },
        ],
      });
    });
  });
});
