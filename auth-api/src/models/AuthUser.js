const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { IncorrectPasswordError } = require("../errors");

module.exports = function (knex) {
  return class AuthUser {
    constructor(id, username) {
      const token = jwt.sign(
        {
          id,
        },
        process.env.JWT_SECRET
      );
      this.id = id;
      this.username = username;
      this.token = token;
    }

    static async create(username, password) {
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
      const id = (await knex("user").insert({ username, salt, hash }))[0];
      return new AuthUser(id, username);
    }

    static async get(username, password) {
      const user = (
        await knex("user").select(["id", "hash", "salt"]).where({ username })
      )[0];
      if (!user) return;
      const hash = crypto
        .pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
        .toString("hex");
      if (hash !== user.hash) throw new IncorrectPasswordError();
      return new AuthUser(user.id, username);
    }
  };
};
