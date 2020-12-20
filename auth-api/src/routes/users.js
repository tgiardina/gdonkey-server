const { errorProof } = require("../middleware/error");

module.exports = function (app, models) {
  app.post(
    "/users",
    errorProof(async (req, res) => {
      const { username, password } = req.body.user;
      const user = await models.AuthUser.create(username, password);
      res.status(201).json({
        user,
      });
    })
  );
};
