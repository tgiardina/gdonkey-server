module.exports = class RankOverflowError extends Error {
  constructor(rank) {
    super(`Invalid rank ${rank}`)
    this.rank = rank;
  }
}