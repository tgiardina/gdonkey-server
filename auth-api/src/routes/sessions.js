const { errorProof } = require("../middleware/error");

module.exports = function (app, models) {
  app.post(
    "/sessions",
    errorProof(async (req, res) => {
      const { username, password } = req.body.session;
      let user;
      try {
        user = await models.AuthUser.get(username, password);
        if (!user) {
          return res.status(401).json({
            errors: [
              {
                type: "ER_NOT_FOUND",
                location: "body",
                resource: "session",
                property: "username",
                value: username,
              },
            ],
          });
        }
      } catch (err) {
        if (err.code === "ER_INCORRECT_PASSWORD") {
          return res.status(401).json({
            errors: [
              {
                type: "ER_NOT_FOUND",
                location: "body",
                resource: "session",
                property: "password",
                value: password,
              },
            ],
          });
        } else {
          throw err;
        }
      }
      return res.status(200).json({
        session: {
          username: user.username,
          token: user.token,
          userId: user.id,
        },
      });
    })
  );
};
