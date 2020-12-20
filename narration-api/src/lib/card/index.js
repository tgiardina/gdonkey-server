const { CardOverflowError, DuplicateCardError, RankOverflowError, SuitOverflowError } = require('./errors');

function getCard(rank, suit) {
  if(rank < 0 || rank > 12) throw new RankOverflowError(rank);
  if(suit < 0 || rank > 12) throw new SuitOverflowError(suit);
  return rank*4+suit;
}

function getFlop(card0, card1, card2) {
  if(card0 < 0 || card0 > 51) throw new CardOverflowError(card0);
  if(card1 < 0 || card1 > 51) throw new CardOverflowError(card1);
  if(card2 < 0 || card2 > 51) throw new CardOverflowError(card2);    
  if(card0 === card1) throw new DuplicateCardError(card0);
  if(card0 === card2) throw new DuplicateCardError(card0);        
  if(card1 === card2) throw new DuplicateCardError(card1);
  const [low, mid, high] = [card0, card1, card2].sort((a,b) => a-b);
  return high*(high-1)*(high-2)/6 + mid*(mid-1)/2 + low;
}

function getPocket(card0, card1) {
  if(card0 < 0 || card0 > 51) throw new CardOverflowError(card0);
  if(card1 < 0 || card1 > 51) throw new CardOverflowError(card1);
  if(card0 === card1) throw new DuplicateCardError(card0);
  const high = Math.max(card0, card1);
  const low = Math.min(card0, card1);
  return high*(high-1)/2 + low;
}

module.exports = { getCard, getFlop, getPocket }