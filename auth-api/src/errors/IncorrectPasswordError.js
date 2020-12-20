module.exports = class IncorrectPasswordError extends Error {
  constructor() {
    super("The password provided is incorrect");
    this.code = "ER_INCORRECT_PASSWORD";
  }
};
