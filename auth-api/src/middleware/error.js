const { validationResult } = require("express-validator");

class ValidationError extends Error {
  constructor(errors) {
    super("express-validator failed to validate request");
    this.errors = errors;
  }
}

module.exports = {
  // eslint-disable-next-line no-unused-vars
  catchErr: (err, _req, res, _next) => {
    if (err.code === "ER_DUP_ENTRY") {
      const sqlSplit = err.sqlMessage.split("'");
      const indexSplit = sqlSplit[3].split("_");
      const resource = indexSplit[0];
      const property = indexSplit[1];
      const value = sqlSplit[1];
      res.status(409).json({
        errors: [
          {
            type: "ER_DUPLICATE",
            location: "body",
            resource,
            property,
            value,
          },
        ],
      });
    } else {
      console.log(err);
      res.status(500).send();
    }
  },

  errorProof: (endpoint) => {
    return async (req, res, next) => {
      try {
        await endpoint(req, res);
      } catch (err) {
        next(err);
      }
    };
  },

  getValidators: (validators) => {
    return [
      ...validators,
      async (req, _res, next) => {
        const { errors } = validationResult(req);
        errors.length ? next(new ValidationError(errors)) : next();
      },
    ];
  },
};
