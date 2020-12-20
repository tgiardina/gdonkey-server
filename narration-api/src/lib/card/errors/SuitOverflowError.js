module.exports = class SuitOverflowError extends Error {
  constructor(suit) {
    super(`Invalid suit ${suit}`)
    this.suit = suit;
  }
}