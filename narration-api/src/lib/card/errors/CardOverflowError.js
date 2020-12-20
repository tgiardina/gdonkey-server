module.exports = class CardOverflowError extends Error {
  constructor(card) {
    super(`Invalid card ${card}`)
    this.card = card;
  }
}