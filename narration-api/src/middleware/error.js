const { validationResult } = require('express-validator');

class ValidationError extends Error{
  constructor(errors) {
    super("express-validator failed to validate request");
    this.errors = errors;
  }
}

module.exports = {
  catchErr: (err, _req, res, _next) => {
    console.log(err);
    res.status(400).json(err);
  },

  errorProof: (endpoint) => {
    return async (req, res, next) => {
      try {
        await endpoint(req, res);
      } catch(err) {
        next(err);
      }
    }
  },

  getValidators: (validators) => {
    return [...validators, async (req, _res, next) => {
      const { errors } = validationResult(req);
      errors.length 
        ? next(new ValidationError(errors))
        : next();
    }]   
  }
}