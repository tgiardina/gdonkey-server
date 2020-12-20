module.exports = class DuplicateCardError extends Error {
  constructor(card) {
    super(`Duplicate card ${card}`)
    this.card = card;
  }  
}