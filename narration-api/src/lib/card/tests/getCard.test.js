const { expect } = require('chai');
const { getCard } = require('../');

describe('card.getCard', () => {
  it('should correctly translate As', () => {
    expect(getCard(12, 3)).to.equal(51);
  })

  it('should correctly translate 2c', () => {
    expect(getCard(0, 0)).to.equal(0);
  })  

  it('should correctly translate Td', () => {
    expect(getCard(8, 1)).to.equal(33);
  })    
})